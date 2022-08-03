interface ICreateTeacherDTO {
  name: string;
  ethnicity?: string;
  nationality?: string;
  crm: string;
  cpf: string;
  titration: string;
  password: string;
  marital_status?: string;
  birth_date: Date;
  address?: string;
  city?: string;
  state?: string;
  gender: string;
  especialization: string;
  phone_number?: string;
  id?: string;
}

export { ICreateTeacherDTO };
