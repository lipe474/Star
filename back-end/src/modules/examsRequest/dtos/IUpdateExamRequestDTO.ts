interface IUpdateExamRequestDTO {
  id: string;
  exams: string;
  diagnostic_hypothesis: string;
  date: Date;
}

export { IUpdateExamRequestDTO };
