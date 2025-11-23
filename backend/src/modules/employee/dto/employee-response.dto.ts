export class EmployeeResponseDto {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isActive: boolean;  
    imageUrl?: string;

    constructor(employee: any) {
        this.id = employee.id;
        this.userName = employee.userName;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.email = employee.email;
        this.phone = employee.phone;
        this.isActive = employee.isActive;  
        this.imageUrl = employee.imageUrl;  
    }
}
