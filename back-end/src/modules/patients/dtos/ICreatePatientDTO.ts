interface ICreatePatientDTO {
  name: string;
  ethnicity?: string;
  nationality?: string;
  cpf: string;
  birth_date: Date;
  marital_status?: string;
  address?: string;
  state?: string;
  city?: string;
  gender: string;
  phone_number?: string;
  id?: string;
}

export { ICreatePatientDTO };
