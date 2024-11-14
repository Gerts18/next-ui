import { IStudentRepository } from "@/app/domain/repositories/IStudentRepository"
import { Student, StudentValidator } from "@/app/domain/entities/Student";

export class RegisterStudentUseCase {
    constructor(private studentRepository: IStudentRepository) {}

    async execute(student: Student): Promise<Student> {
        
        const validationErrors = StudentValidator.validate(student);

        if (validationErrors.length > 0) {
            throw new Error(validationErrors.join(','));
        }

        return await this.studentRepository.create(student);

    }   
}