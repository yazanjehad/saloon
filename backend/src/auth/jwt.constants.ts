// src/auth/jwt.constants.ts
export const jwtConstants = {
  // adminSecret: process.env.JWT_ADMIN_SECRET || 'defaultAdminSecret',

  adminSecret: process.env.JWT_ADMIN_SECRET,

  employeeSecret: process.env.JWT_EMPLOYEE_SECRET || 'defaultEmployeeSecret',
  saloonSecret: process.env.JWT_SALOON_SECRET || 'defaultSaloonSecret',
  expiresIn: process.env.JWT_EXPIRATION || '7d',
};