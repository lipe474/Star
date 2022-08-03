interface IUpdatePatientDTO {
  id: string;
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
}

export { IUpdatePatientDTO };
