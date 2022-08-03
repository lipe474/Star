import { IUpdatePatientDTO } from "@modules/patients/dtos/IUpdatePatientDTO";
import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { UpdatePatientUseCase } from "./UpdatePatientUseCase";

let updatePatientUseCase: UpdatePatientUseCase;
let patientsRepositoryInMemory: PatientsRepositoryInMemory;

describe("Update patient", () => {
  beforeEach(() => {
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    updatePatientUseCase = new UpdatePatientUseCase(patientsRepositoryInMemory);
  });

  it("should be able to update a patient", async () => {
    const patient = await patientsRepositoryInMemory.create({
      name: "Patient Supertest",
      ethnicity: "test",
      nationality: "test",
      cpf: "1234",
      marital_status: "test",
      birth_date: new Date("2000-12-12 00:00:00"),
      address: "test",
      city: "test",
      state: "test",
      gender: "test",
      phone_number: "1000",
    });

    const data: IUpdatePatientDTO = {
      id: patient.id,
      name: "Patient Supertest 2",
      ethnicity: "test2",
      nationality: "test2",
      cpf: "4321",
      marital_status: "test",
      birth_date: new Date("2000-12-12 00:00:00"),
      address: "test",
      city: "test",
      state: "test",
      gender: "test",
      phone_number: "1000",
    };

    const response = await updatePatientUseCase.execute(patient.id, data);

    expect(response.name).toEqual(data.name);
    expect(response.ethnicity).toEqual(data.ethnicity);
    expect(response.nationality).toEqual(data.nationality);
    expect(response.cpf).toEqual(data.cpf);
  });

  it("should not be able to update an non-existing patient", async () => {
    const patient = await patientsRepositoryInMemory.create({
      name: "Patient Supertest",
      ethnicity: "test",
      nationality: "test",
      cpf: "1234",
      marital_status: "test",
      birth_date: new Date("2000-12-12 00:00:00"),
      address: "test",
      city: "test",
      state: "test",
      gender: "test",
      phone_number: "1000",
    });

    const data: IUpdatePatientDTO = {
      id: patient.id,
      name: "Patient Supertest 2",
      ethnicity: "test2",
      nationality: "test2",
      cpf: "4321",
      marital_status: "test",
      birth_date: new Date("2000-12-12 00:00:00"),
      address: "test",
      city: "test",
      state: "test",
      gender: "test",
      phone_number: "1000",
    };
    await expect(updatePatientUseCase.execute("test", data)).rejects.toEqual(
      new AppError("Patient does not exists!")
    );
  });
});
