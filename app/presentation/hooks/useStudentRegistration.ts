import { useState } from "react";
import { Student } from "@/app/domain/entities/Student";
import { RegisterStudentUseCase } from "@/app/domain/useCase/RegisterStudent";
import { StudentRepository } from "@/app/domain/repositories/StudentRepository";

interface RegistrationStatus{
    message: string;
    type: "success" | "error" | null;
}

export const useStudentRegistration = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<RegistrationStatus>({
        message: "", 
        type: null,
    });

    const studentRepository = new StudentRepository();
    const registerStudentUseCase = new RegisterStudentUseCase(studentRepository);

    const registerStudent = async (student: Student) => {
        setLoading(true);
        try {
            await registerStudentUseCase.execute(student);
            setStatus({message: "Student registered successfully", type: "success"});
            return true;
        } catch (error:any) {
            setStatus({message: error.message, type: "error"});
            return false;
        } finally {
            setLoading(false);
            setTimeout(() => {
                setStatus({message: "", type: null});
            } , 3000);
        } 
    }

    return {
        registerStudent,
        loading,
        status,
    }
}   