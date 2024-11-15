import { Student } from "@/app/domain/entities/Student";


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

export interface IStudentRepository {
    create(student:Student): Promise<Student>;
    getAll(page?: number): Promise<ApiResponse>;
}