import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeResponseDto } from './dto/employee-response.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwt.constants';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
    private jwtService: JwtService, 
  ) {}

  // ================================
  // CREATE Employee
  // ================================
  async createEmployee(dto: CreateEmployeeDto) {
    // تحقق من عدم تكرار اسم المستخدم أو الإيميل
    const exists = await this.employeeRepo.findOne({
      where: [{ userName: dto.userName }, { email: dto.email }],
    });
    if (exists) throw new ConflictException('Employee with this username or email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const employee = this.employeeRepo.create({
      ...dto,
      password: hashedPassword,
      isActive: dto.isActive ?? true,
      imageUrl: dto.imageUrl ?? 'default-image.png',
      saloon: { id: dto.saloonId } as any,
    });

    const saved = await this.employeeRepo.save(employee);
    return {
      message: 'Employee created successfully',
      data: new EmployeeResponseDto(saved),
    };
  }

  // ================================
  // LOGIN Employee
  // ================================
 async loginEmployee(userName: string, password: string) {
  const emp = await this.employeeRepo.findOne({ where: { userName } });
  if (!emp) throw new NotFoundException('Employee not found');

  const isPasswordValid = await bcrypt.compare(password, emp.password);
  if (!isPasswordValid) throw new ConflictException('Invalid password');

  const payload = { sub: emp.id, userName: emp.userName };
  const accessToken = this.jwtService.sign(payload, {
    secret: jwtConstants.employeeSecret,
    expiresIn: '1h',
  });

  return {
    message: 'Login successful',
    data: {
      employee: new EmployeeResponseDto(emp),
      accessToken,
    },
  };
}

  // ================================
  // GET ALL Employees
  // ================================
  async findAllEmployees() {
    const employees = await this.employeeRepo.find();
    return {
      message: 'Employees fetched successfully',
      data: employees.map(emp => new EmployeeResponseDto(emp)),
    };
  }

  // ================================
  // GET ONE Employee
  // ================================
  async findEmployeeById(id: number) {
    const emp = await this.employeeRepo.findOne({ where: { id } });
    if (!emp) throw new NotFoundException('Employee not found');

    return {
      message: 'Employee fetched successfully',
      data: new EmployeeResponseDto(emp),
    };
  }

  // ================================
  // UPDATE Employee
  // ================================
  async updateEmployee(id: number, dto: UpdateEmployeeDto) {
    const emp = await this.employeeRepo.findOne({ where: { id } });
    if (!emp) throw new NotFoundException('Employee not found');

    if (dto.userName) emp.userName = dto.userName;
    if (dto.password) emp.password = await bcrypt.hash(dto.password, 10);

    const updated = await this.employeeRepo.save(emp);
    return {
      message: 'Employee updated successfully',
      data: new EmployeeResponseDto(updated),
    };
  }

  // ================================
  // DELETE Employee
  // ================================
  async deleteEmployee(id: number) {
    const emp = await this.employeeRepo.findOne({ where: { id } });
    if (!emp) throw new NotFoundException('Employee not found');

    await this.employeeRepo.remove(emp);
    return {
      message: 'Employee removed successfully',
      data: new EmployeeResponseDto(emp),
    };
  }
}
