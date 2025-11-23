import { Injectable } from "@nestjs/common";
import { Appointment } from "./entities/appointment.entity";
import { AppointmentServiceEntity } 
  from '../appointment-service/entities/appointment-service.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { BookingSlot } from "../booking-slot/entities/booking-slot.entity";
import { Customer } from "../customer/entities/customer.entity";
import { Service } from "../services/entities/service.entity";

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,

    @InjectRepository(BookingSlot)
    private slotRepo: Repository<BookingSlot>,

    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,

    @InjectRepository(AppointmentServiceEntity)
    private appServiceRepo: Repository<AppointmentServiceEntity>,

    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,
  ) {}

  async createAppointment(dto: {
    bookingSlotId: number;
    customerId: number;
    serviceIds: number[];
  }) {

    // -----------------------
    // 1️⃣ نجيب الـ BookingSlot
    // -----------------------
    const slot = await this.slotRepo.findOne({
      where: { id: dto.bookingSlotId },
      relations: ['employee', 'employee.saloon'],
    });

    if (!slot) throw new Error('Booking slot not found');
    if (!slot.isAvailable) throw new Error('This slot is already booked.');

    // -----------------------
    // 2️⃣ نجيب العميل
    // -----------------------
    const customer = await this.customerRepo.findOne({
      where: { id: dto.customerId },
    });

    if (!customer) throw new Error('Customer not found');

    // -----------------------
    // 3️⃣ نجيب الخدمات
    // -----------------------
    const services = await this.serviceRepo.findBy({
      id: In(dto.serviceIds),
    });

    if (services.length === 0)
      throw new Error('No valid services selected');

    // -----------------------
    // 4️⃣ ننشئ Appointment
    // -----------------------
    const appointment = new Appointment();
    appointment.bookingSlot = slot;
    appointment.customer = customer;
    appointment.employee = slot.employee;
    appointment.saloon = slot.employee.saloon; // مهم جدًا
    appointment.status = 'pending';

    const savedAppointment = await this.appointmentRepo.save(appointment);

    // -----------------------
    // 5️⃣ حفظ الخدمات داخل appointment_services
    // -----------------------
    const appServices: AppointmentServiceEntity[] = [];

    for (const service of services) {
      const aps = new AppointmentServiceEntity();
      aps.appointment = savedAppointment;
      aps.service = service;
      aps.price = service.price;
      appServices.push(aps);
    }

    await this.appServiceRepo.save(appServices);

    // -----------------------
    // 6️⃣ تحديث حالة الـ Slot
    // -----------------------
    slot.isAvailable = false;
    await this.slotRepo.save(slot);

    return {
      message: 'Appointment booked successfully',
      appointmentId: savedAppointment.id,
    };
  }
}
