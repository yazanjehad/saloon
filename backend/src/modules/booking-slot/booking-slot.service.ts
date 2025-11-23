// src/modules/booking-slot/booking-slot.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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

    const slots: BookingSlot[] = [];

    for (const schedule of employee.weeklySchedule) {
      if (!schedule.isWorking) continue;

      const services = employee.services;

      for (const service of services) {
        const start = schedule.startTime; // "09:00:00"
        const end = schedule.endTime;     // "17:00:00"

        let current = startToMinutes(start); // دالة تحويل الوقت إلى دقائق
        const endMinutes = startToMinutes(end);

        while (current + service.durationMinutes <= endMinutes) {
          const slot = new BookingSlot();
          slot.employee = employee;
          slot.service = service;
          slot.date = nextDateOfWeek(schedule.day); // دالة تعطي تاريخ اليوم القادم
          slot.startTime = minutesToTime(current);
          slot.endTime = minutesToTime(current + service.durationMinutes);
          slot.isAvailable = true;
          slots.push(slot);

          current += service.durationMinutes; // ننتقل للفترة التالية
        }
      }
    }

    return this.slotRepo.save(slots);
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
