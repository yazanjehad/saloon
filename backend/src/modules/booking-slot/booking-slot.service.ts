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

  const today = new Date().toISOString().split('T')[0];
  const slotsToCreate: BookingSlot[] = [];

  for (const schedule of employee.weeklySchedule) {

    if (!schedule.isWorking || !schedule.startTime || !schedule.endTime) continue;

    const slotDate = nextDateOfWeek(schedule.day);

    //  فحص: لا نولد Slots لتاريخ اليوم السابق
    if (slotDate < today) continue;

    // إحضار كل الSlots الحالية لهذا التاريخ
    const existingSlots = await this.slotRepo.find({
      where: {
        employee: { id: employeeId },
        date: slotDate,
      },
      relations: ['service'],
    });

    const bookedSlots = existingSlots.filter(s => !s.isAvailable);
    const freeSlots   = existingSlots.filter(s => s.isAvailable);

    //  لا نحذف المحجوز
    // نحذف فقط الفارغة لأنها ستُعاد توليدها
    if (freeSlots.length > 0) {
      await this.slotRepo.remove(freeSlots);
    }

    // نبدأ توليد Slots جديدة للخدمات
    for (const service of employee.services) {
      let current = startToMinutes(schedule.startTime);
      const endMinutes = startToMinutes(schedule.endTime);

      while (current + service.durationMinutes <= endMinutes) {
        const slotStart = minutesToTime(current);
        const slotEnd   = minutesToTime(current + service.durationMinutes);

        //  منع توليد Slot إذا كانت محجوزة بنفس الوقت لنفس الخدمة
        const conflict = bookedSlots.some(b =>
          b.service.id === service.id &&
          b.startTime === slotStart &&
          b.endTime === slotEnd
        );

        if (!conflict) {
          const slot = new BookingSlot();
          slot.employee = employee;
          slot.service = service;
          slot.date = slotDate;
          slot.startTime = slotStart;
          slot.endTime = slotEnd;
          slot.isAvailable = true;
          slotsToCreate.push(slot);
        }

        current += service.durationMinutes;
      }
    }
  }

  return this.slotRepo.save(slotsToCreate);
}

async deleteSlotsForDay(employeeId: number, day: string) {
  const slotDate = nextDateOfWeek(day);

  await this.slotRepo.delete({
    employee: { id: employeeId },
    date: slotDate,
    isAvailable: true,          //  لا نحذف المحجوز
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
