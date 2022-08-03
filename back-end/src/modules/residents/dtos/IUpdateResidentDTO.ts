interface IUpdateResidentDTO {
  id: string;
  name: string;
  ethnicity?: string;
  nationality?: string;
  crm: string;
  cpf: string;
  residence_date: string;
  password: string;
  marital_status?: string;
  birth_date: Date;
  address?: string;
  city?: string;
  state?: string;
  gender: string;
  especialization: string;
  phone_number?: string;
}

export { IUpdateResidentDTO };
