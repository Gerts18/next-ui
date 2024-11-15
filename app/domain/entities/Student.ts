export interface Student {
    id?: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    phone?: string,
    gradeRef : string
}



export class StudentValidator {
    static validate(student: Partial<Student>): string[] {
        const errors: string[]=[];

        if(!student.name || student.name.trim().length<2){
            errors.push("Name must be at least 2 characters");
        }

        if(!student.lastName || student.lastName.trim().length<2){
            errors.push("Last name must be at least 2 characters");
        }
        if(!student.email || !student.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            errors.push("Invalid email");
        } 
        if(!student.password || student.password.trim().length<6){
            errors.push("Password must be at least 6 characters");
        } 
        if(!student.phone || !student.phone.match(/^\+?[\d\s-]{8,}$/)){
            errors.push("Invalid phone number");
        }
        if(!student.gradeRef){
            errors.push("Grade is required");
        }

        return errors;
    }
}