interface ICreateExamRequestDTO {
  exams: string;
  diagnostic_hypothesis: string;
  date: Date;
  patient_id: string;
  id?: string;
}

export { ICreateExamRequestDTO };
