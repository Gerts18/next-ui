import { useState, useEffect } from "react";
import { Student } from "@/app/domain/entities/Student";

interface FetchStatus{
    message: string;
    type: "success" | "error" | null;
}

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
    method: string;
}

export const useFetchStudents = (initialPerPage=5) => {
    const [student, setStudent] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(initialPerPage);
    const [status, setStatus] = useState<FetchStatus>(
        {
            message : "",
            type: null
        }
    );
    const [pagination, setPagination] = useState<PaginationInfo |null >(null);

    const mapServerDataToUsers = (serverData: any): Student => ( {
        id: serverData._id  ,
        name: serverData.name || "",
        lastName: serverData.lastName,
        email: serverData.email,
        password: serverData.password,
        phone: serverData.phone,
        gradeRef: serverData.gradeRef
    })

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
        //fetchUsers(newPage, perPage);
    }

    const onPerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
        //fetchUsers(1, perPage);
    }

    useEffect( () => {
        if(status.type){
            const timer = setTimeout(() => {
                setStatus({
                    message: "",
                    type: null
                })
            }, 10000);
            return () => clearTimeout(timer);
        }
    },[status])

    useEffect( () => {
        // fetchStudents (1, perPage)
    } )


    return {
        student, 
        loading,
        status,
        pagination,
        currentPage,
        perPage,
        onPageChange,
        onPerPageChange 
        
    }

}