import { IStudentRepository } from "@/app/domain/repositories/IStudentRepository"
import { Student } from "@/app/domain/entities/Student";
import axios from 'axios';


interface PaginationInfo {
    currentPage: number;
    totalPage: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface ApiResponse{
    success: boolean;
    status: number;
    data: Student [];
    pagination: PaginationInfo;
    timestamp: string;
    path: string;
    method: string
}

export class StudentRepository implements IStudentRepository {
    private readonly endPointURL = process.env.endPointURL_Students_Create;

    async create(student: Student): Promise<Student> {
        try {
            const response = await axios.post<Student>(this.endPointURL || '/api/users', student, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }); 
            return response.data;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Error creating student");
            }
        }
        throw new Error("Error creating student (doesn't suppose to happen)");
    }


    async getAll(page: number = 1): Promise<ApiResponse>{
        try{
            const response = await axios.get<ApiResponse>(`${this.endPointURL || '/api/users'}?page=${page}`);
            return response.data;
        }catch (error){
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || "Error fetching students");
            }
            throw new Error("Error fetching students (doesn't suppose to happen)");
        }
    }
}

