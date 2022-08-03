import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { ListPatientsUseCase } from "./ListPatientsUseCase";

let listPatientsUseCase: ListPatientsUseCase;
let patientsRepositoryInMemory: PatientsRepositoryInMemory;

describe("List patients", () => {
  beforeEach(() => {
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    listPatientsUseCase = new ListPatientsUseCase(patientsRepositoryInMemory);
  });

  it("should be able to list all patients", async () => {
    const patient = await patientsRepositoryInMemory.create({
      name: "Patient",
      ethnicity: "test",
      nationality: "test",
      cpf: "121212",
      birth_date: new Date("2022-12-12 00:00:00"),
      marital_status: "test",
      address: "test",
      state: "test",
      city: "test",
      gender: "test",
      phone_number: "1000",
    });
    const patients = await listPatientsUseCase.execute();
    expect(patients).toEqual([patient]);
  });
});
