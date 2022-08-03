import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreatePatientUseCase } from "./CreatePatientUseCase";

let createPatientUseCase: CreatePatientUseCase;
let patientsRepositoryInMemory: PatientsRepositoryInMemory;

describe("Create a patient", () => {
  beforeEach(() => {
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    createPatientUseCase = new CreatePatientUseCase(patientsRepositoryInMemory);
  });

  it("should be able to create a new patient", async () => {
    const patient = await createPatientUseCase.execute({
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
    expect(patient).toHaveProperty("id");
  });

  it("should not be able to create a patient with exists cpf", async () => {
    await createPatientUseCase.execute({
      name: "Patient1",
      ethnicity: "test1",
      nationality: "test1",
      cpf: "123456",
      birth_date: new Date("2022-12-12 00:00:00"),
      marital_status: "test1",
      address: "test1",
      state: "test1",
      city: "test1",
      gender: "test1",
      phone_number: "1000",
    });
    await expect(
      createPatientUseCase.execute({
        name: "Patient2",
        ethnicity: "test2",
        nationality: "test2",
        cpf: "123456",
        birth_date: new Date("2022-12-12 00:00:00"),
        marital_status: "test2",
        address: "test2",
        state: "test2",
        city: "test2",
        gender: "test2",
        phone_number: "1000",
      })
    ).rejects.toEqual(new AppError("Patient already exists!"));
  });
});
