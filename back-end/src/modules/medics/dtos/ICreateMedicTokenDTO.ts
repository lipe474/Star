interface ICreateMedicTokenDTO {
  medic_id?: string;
  resident_id?: string;
  teacher_id?: string;
  expires_date: Date;
  refresh_token: string;
}

export { ICreateMedicTokenDTO };
