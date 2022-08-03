import { AxiosError } from "axios";
import { ApiService } from "../../data/service/Api.Service";
import { Teacher } from "../../data/@types/teacher";

export const listTeachers = async () => {
    try {
        const response = await ApiService.get(`/teachers`);
        return response?.data;
    } catch (error) {
        return error;
    }
}

export const RegisTeachers = async (obj: Teacher) => {
    try {
        return await ApiService.post(`/teachers`, {
            name: obj?.name,
            ethnicity: obj?.ethnicity,
            titration: obj?.titration,
            nationality: obj?.nationality,
            crm: obj?.crm,
            cpf: obj?.cpf?.replace(/[^\d]+/g, ''),
            password: obj?.password,
            birth_date: obj?.birth_date,
            marital_status: obj?.marital_status,
            address: obj?.address,
            state: obj?.state,
            city: obj?.city,
            gender: obj?.gender,
            especialization: obj?.especialization,
            phone_number: obj?.phone_number,
            id: '3'
        });

    } catch (error) {
        if (error  instanceof AxiosError) {
            return error?.response
        }
        return
    }
}

export const UpdatedTeachers = async (obj: Teacher, id: string) => {
    try {
        return await ApiService.put(`/teachers/${id}`, {
            name: obj?.name,
            ethnicity: obj?.ethnicity,
            titration: obj?.titration,
            nationality: obj?.nationality,
            crm: obj?.crm,
            cpf: obj?.cpf?.replace(/[^\d]+/g, ''),
            password: obj?.password,
            birth_date: obj?.birth_date,
            marital_status: obj?.marital_status,
            address: obj?.address,
            state: obj?.state,
            city: obj?.city,
            gender: obj?.gender,
            especialization: obj?.especialization,
            phone_number: obj?.phone_number,
            id: '3'
        });

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}
export const DeleteTeachers = async (id: string) => {
    try {
        return await ApiService.delete(`/teachers/${id}`);

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}

export const getByIdTeachers = async (id: string) => {
    try {
        const { data } = await ApiService.get(`/teachers/${id}`)
        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
    }
}
