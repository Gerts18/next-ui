import { Student } from "@/app/domain/entities/Student";

export interface StudentFormProps {
    onSubmit: (student: Student) => void;
    loading: boolean;
    error: string | null ;
}