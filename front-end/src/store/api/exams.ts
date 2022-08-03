import { AxiosError } from "axios";
import { Exam } from "../../data/@types/exams";
import { ApiService } from "../../data/service/Api.Service";

export const listExams = async (id: string) => {
    try {
        const response = await ApiService.get(`/exams/all/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const RegisExams = async (obj: Exam, id: string) => {
    try {
        return await ApiService.post(`/exams`, {
            name: obj?.name,
            date: obj?.date,
            attachment: obj?.attachment,
            report: obj?.report,
            status: obj?.status,
            examRequest_id: id
        });

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}

export const UpdatedExam = async (obj: Exam, id: string) => {
    try {
        return await ApiService.put(`/exams/${id}`, {
            name: obj?.name,
            date: obj?.date,
            attachment: obj?.attachment,
            report: obj?.report,
            status: obj?.status,
            examRequest_id: id
        });

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}
export const DeleteExam = async (id: string) => {
    try {
        return await ApiService.delete(`/exams/${id}`);

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}

export const getFileUrl = async (file: File) => {
    const formData = new FormData();
    formData.append('exam', file);

    try {
        const { data } = await ApiService.patch(`/exams/attachment`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
    }
}

export const getByIdExam = async (id: string) => {
    try {
        const { data } = await ApiService.get(`/exams/${id}`)
        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
    }
}



