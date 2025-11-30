import { Injectable } from '@nestjs/common';
import { Repository, LessThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingSlot } from './entities/booking-slot.entity';
import { Employee } from '../employee/entities/employee.entity';
import { Service } from '../services/entities/service.entity';
import { EmployeeWeeklySchedule } from '../employee-weekly-schedule/entities/employee-weekly-schedule.entity';

@Injectable()
export class BookingSlotService {
  constructor(
    @InjectRepository(BookingSlot) private slotRepo: Repository<BookingSlot>,
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(EmployeeWeeklySchedule) private scheduleRepo: Repository<EmployeeWeeklySchedule>,
  ) {}

  
  async generateSlots(employeeId: number) {
    const employee = await this.employeeRepo.findOne({
      where: { id: employeeId },
      relations: ['services', 'weeklySchedule'],
    });

    if (!employee) throw new Error('Employee not found');

    // Delete past slots
    await this.slotRepo.delete({
      employee: { id: employeeId },
      date: LessThan(new Date().toISOString().split('T')[0])
    });

    const slots: BookingSlot[] = [];

    for (const schedule of employee.weeklySchedule) {
      // تجاهل الأيام المغلقة أو غير مكتملة البيانات
      if (!schedule.isWorking || !schedule.startTime || !schedule.endTime) continue;

      const services = employee.services;
      const slotDate = nextDateOfWeek(schedule.day); // التاريخ القادم لليوم

      // Check if slots already exist for this date and employee
      const existingSlots = await this.slotRepo.find({
        where: {
          employee: { id: employeeId },
          date: slotDate,
        },
      });
      if (existingSlots.length > 0) continue; // Skip if slots already exist for this date

      for (const service of services) {
        let current = startToMinutes(schedule.startTime);
        const endMinutes = startToMinutes(schedule.endTime);

        while (current + service.durationMinutes <= endMinutes) {
          const slot = new BookingSlot();
          slot.employee = employee;
          slot.service = service;
          slot.date = slotDate;
          slot.startTime = minutesToTime(current);
          slot.endTime = minutesToTime(current + service.durationMinutes);
          slot.isAvailable = true;
          slots.push(slot);

          current += service.durationMinutes;
        }
      }
    }

    return this.slotRepo.save(slots);
  }
  async deleteSlotsForDay(employeeId: number, day: string) {
    const slotDate = nextDateOfWeek(day);
    await this.slotRepo.delete({
      employee: { id: employeeId },
      date: slotDate,
    });
  }

    


  async getSlotsByEmployeeId(employeeId: number): Promise<BookingSlot[]> {
    return this.slotRepo.find({
      where: {
        employee: { id: employeeId },
      },
      relations: ['service', 'employee'],
      order: {
        date: 'ASC',
        startTime: 'ASC',
      },
    });
  }

async getSlotsByEmployeeIdAndServiceId(employeeId: number, serviceId: number) {
  const slots = await this.slotRepo.find({
    where: {
      employee: { id: employeeId },
      service: { id: serviceId },
    },
    relations: ['service', 'employee'],
    order: {
      date: 'ASC',
      startTime: 'ASC',
    }
  });

  // تجهيز الريسبونس
  return slots.map(s => ({
    date: s.date,
    dayName: new Date(s.date).toLocaleDateString('en-US', { weekday: 'long' }),
    startTime: s.startTime,
    endTime: s.endTime,
    isAvailable: s.isAvailable,
    employeeName: s.employee?.userName,
    serviceName: s.service?.name,
  }));
}


async getAvailableSlotsByCriteria(employeeId: number, serviceId: number, date: string) {
  const slots = await this.slotRepo.find({
    where: {
      employee: { id: employeeId },
      service: { id: serviceId },
      date: date,
    },
    relations: ['employee', 'service'],
    order: {
      date: 'ASC',
      startTime: 'ASC',
    },
  });

  // تجهيز الريسبونس
  return slots.map(s => ({
    date: s.date,
    dayName: new Date(s.date).toLocaleDateString('en-US', { weekday: 'long' }),
    startTime: s.startTime,
    endTime: s.endTime,
    isAvailable: s.isAvailable,
    employeeName: s.employee?.userName,
    serviceName: s.service?.name,
  }));
}


}

// تحويل الوقت "HH:MM:SS" إلى دقائق
function startToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

// تحويل الدقائق إلى "HH:MM:SS"
function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}:00`;
}

// مثال: تحديد تاريخ اليوم القادم الذي يوافق يوم الأسبوع
function nextDateOfWeek(day: string): string {
  const daysMap = { sun:0, mon:1, tue:2, wed:3, thu:4, fri:5, sat:6 };
  const today = new Date();
  const todayDay = today.getDay();
  const targetDay = daysMap[day];
  let diff = targetDay - todayDay;
  if(diff < 0) diff += 7;
  const result = new Date(today);
  result.setDate(today.getDate() + diff);
  return result.toISOString().split('T')[0]; // YYYY-MM-DD
}
