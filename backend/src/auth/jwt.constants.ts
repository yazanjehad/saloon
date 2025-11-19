export const jwtConstants = {
  adminSecret: process.env.JWT_ADMIN_SECRET,
  employeeSecret: process.env.JWT_EMPLOYEE_SECRET,
  customerSecret: process.env.JWT_CUSTOMER_SECRET,
  expiresIn: process.env.JWT_EXPIRATION || '7d',
};
