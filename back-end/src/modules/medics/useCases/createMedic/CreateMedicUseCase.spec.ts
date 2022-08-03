import { MedicsRepositoryInMemory } from "@modules/medics/repositories/in-memory/MedicsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { ValidateCpfAndCrm } from "@shared/utils/ValidateCpfAndCrm";
import { container } from "tsyringe";
import { CreateMedicUseCase } from "./CreateMedicUseCase";

let createMedicUseCase: CreateMedicUseCase;
let medicsRepositoryInMemory: MedicsRepositoryInMemory;

const validateCpfAndCrm = container.resolve(ValidateCpfAndCrm);

describe("Create a medic", () => {
  beforeEach(() => {
    medicsRepositoryInMemory = new MedicsRepositoryInMemory();
    createMedicUseCase = new CreateMedicUseCase(medicsRepositoryInMemory);
  });

  it("should be able to create a new medic", async () => {
    const medic = await createMedicUseCase.execute({
      name: "Medic Supertest",
      ethnicity: "test",
      nationality: "test",
      crm: "aa11",
      cpf: "121244",
      password: "123",
      marital_status: "test",
      birth_date: new Date("2000-12-12 00:00:00"),
      address: "test",
      city: "test",
      state: "test",
      gender: "test",
      especialization: "cardiologist",
      phone_number: "1000",
    });
    expect(medic).toHaveProperty("id");
  });

  it("should not be able to create a medic with exists cpf", async () => {
    const medic1 = await createMedicUseCase.execute({
      name: "Medic Supertest",
      ethnicity: "test",
      nationality: "test",
      crm: "aa11",
      cpf: "121244",
      password: "123",
      marital_status: "test",
      birth_date: new Date("2000-12-12 00:00:00"),
      address: "test",
      city: "test",
      state: "test",
      gender: "test",
      especialization: "cardiologist",
      phone_number: "1000",
    });
    await expect(
      createMedicUseCase.execute({
        name: "Medic Supertest 2",
        ethnicity: "test 2",
        nationality: "test 2",
        crm: "aa111",
        cpf: "121244",
        password: "123",
        marital_status: "test",
        birth_date: new Date("2000-12-12 00:00:00"),
        address: "test",
        city: "test",
        state: "test",
        gender: "test",
        especialization: "cardiologist",
        phone_number: "1000",
      })
    ).rejects.toEqual(validateCpfAndCrm.execute(medic1.crm, medic1.cpf));
  });

  it("should not be able to create a medic with exists crm", async () => {
    await createMedicUseCase.execute({
      name: "Medic Supertest",
      ethnicity: "test",
      nationality: "test",
      crm: "aa11",
      cpf: "121244",
      password: "123",
      marital_status: "test",
      birth_date: new Date("2000-12-12 00:00:00"),
      address: "test",
      city: "test",
      state: "test",
      gender: "test",
      especialization: "cardiologist",
      phone_number: "1000",
    });
    await expect(
      createMedicUseCase.execute({
        name: "Medic Supertest 2",
        ethnicity: "test 2",
        nationality: "test 2",
        crm: "aa11",
        cpf: "1212445",
        password: "123",
        marital_status: "test",
        birth_date: new Date("2000-12-12 00:00:00"),
        address: "test",
        city: "test",
        state: "test",
        gender: "test",
        especialization: "cardiologist",
        phone_number: "1000",
      })
    ).rejects.toEqual(new AppError("Medic already exists!"));
  });
});
