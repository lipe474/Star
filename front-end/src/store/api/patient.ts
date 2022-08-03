import { AxiosError } from "axios";
import { Patients } from "../../data/@types/patients";
import { ApiService } from "../../data/service/Api.Service";

export const listPatient = async () => {
    try {
        const response = await ApiService.get(`/patients`);
        return response.data;
    } catch (error) {
        return error;
    }
}



export const RegisPatient = async (obj: Patients) => {
    try {
        return await ApiService.post(`/patients`, {
            name: obj?.name,
            ethnicity: obj?.ethnicity,
            nationality: obj?.nationality,
            cpf: obj?.cpf?.replace(/[^\d]+/g, ''),
            birth_date: obj?.birth_date,
            marital_status: obj?.marital_status,
            address: obj?.address,
            state: obj?.state,
            city: obj?.city,
            gender: obj?.gender,
            phone_number: obj?.phone_number,
        });

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}
export const UpdatedPatient = async (obj: Patients, id: string) => {
    try {
        return await ApiService.put(`/patients/${id}`, {
            name: obj?.name,
            ethnicity: obj?.ethnicity,
            nationality: obj?.nationality,
            cpf: obj?.cpf?.replace(/[^\d]+/g, ''),
            birth_date: obj?.birth_date,
            marital_status: obj?.marital_status,
            address: obj?.address,
            state: obj?.state,
            city: obj?.city,
            gender: obj?.gender,
            phone_number: obj?.phone_number,
        });

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}
export const DeletePatient = async (id: string) => {
    try {
        return await ApiService.delete(`/patients/${id}`);

    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
        return
    }
}

export const getByIdPatient = async (id: string) => {
    try {
        const { data } = await ApiService.get(`/patients/${id}`)
        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error?.response
        }
    }
}
