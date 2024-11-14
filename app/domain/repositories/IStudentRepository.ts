import { Student } from "@/app/domain/entities/Student";

export interface IStudentRepository {
    create(student:Student): Promise<Student>;
    
}