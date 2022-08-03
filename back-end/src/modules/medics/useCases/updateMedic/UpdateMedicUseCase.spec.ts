import { IUpdateMedicDTO } from "@modules/medics/dtos/IUpdateMedicDTO";
import { MedicsRepositoryInMemory } from "@modules/medics/repositories/in-memory/MedicsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { UpdateMedicUseCase } from "./UpdateMedicUseCase";

let updateMedicUseCase: UpdateMedicUseCase;
let medicsRepositoryInMemory: MedicsRepositoryInMemory;

describe("Update medic", () => {
  beforeEach(() => {
    medicsRepositoryInMemory = new MedicsRepositoryInMemory();
    updateMedicUseCase = new UpdateMedicUseCase(medicsRepositoryInMemory);
  });

  it("should be able to update a medic", async () => {
    const medic = await medicsRepositoryInMemory.create({
      name: "Medic Supertest",
      ethnicity: "test",
      nationality: "test",
      crm: "aa11",
      cpf: "1234",
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

    const data: IUpdateMedicDTO = {
      id: medic.id,
      name: "Medic Supertest 2",
      ethnicity: "test2",
      nationality: "test2",
      crm: "bb22",
      cpf: "4321",
      password: "123",
      marital_status: "test",
      birth_date: new Date("2000-12-12 00:00:00"),
      address: "test",
      city: "test",
      state: "test",
      gender: "test",
      especialization: "cardiologist",
      phone_number: "1000",
    };

    const response = await updateMedicUseCase.execute(medic.id, data);

    expect(response.name).toEqual(data.name);
    expect(response.ethnicity).toEqual(data.ethnicity);
    expect(response.nationality).toEqual(data.nationality);
    expect(response.crm).toEqual(data.crm);
    expect(response.cpf).toEqual(data.cpf);
  });

  it("should not be able to update an non-existing medic", async () => {
    const medic = await medicsRepositoryInMemory.create({
      name: "Medic Supertest",
      ethnicity: "test",
      nationality: "test",
      crm: "aa11",
      cpf: "1234",
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

    const data: IUpdateMedicDTO = {
      id: medic.id,
      name: "Medic Supertest 2",
      ethnicity: "test2",
      nationality: "test2",
      crm: "bb22",
      cpf: "4321",
      password: "123",
      marital_status: "test",
      birth_date: new Date("2000-12-12 00:00:00"),
      address: "test",
      city: "test",
      state: "test",
      gender: "test",
      especialization: "cardiologist",
      phone_number: "1000",
    };

    await expect(updateMedicUseCase.execute("test", data)).rejects.toEqual(
      new AppError("Medic does not exists!")
    );
  });
});
