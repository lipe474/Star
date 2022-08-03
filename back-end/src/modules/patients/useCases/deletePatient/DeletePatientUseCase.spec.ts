import { PatientsRepositoryInMemory } from "@modules/patients/repositories/in-memory/PatientsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DeletePatientUseCase } from "./DeletePatientUseCase";

let deletePatientUseCase: DeletePatientUseCase;
let patientsRepositoryInMemory: PatientsRepositoryInMemory;

describe("Delete patient", () => {
  beforeEach(() => {
    patientsRepositoryInMemory = new PatientsRepositoryInMemory();
    deletePatientUseCase = new DeletePatientUseCase(patientsRepositoryInMemory);
  });

  it("should be able to delete a patient", async () => {
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
    await deletePatientUseCase.execute(patient.id);

    expect(deletePatientUseCase).not.toContainEqual(patient);
  });

  it("should not be able to delete an non-existing patient", async () => {
    await expect(deletePatientUseCase.execute("fakeID")).rejects.toEqual(
      new AppError("Patient does not exists!")
    );
  });
});
