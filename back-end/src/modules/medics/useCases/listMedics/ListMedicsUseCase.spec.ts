import { MedicsRepositoryInMemory } from "@modules/medics/repositories/in-memory/MedicsRepositoryInMemory";
import { ListMedicsUseCase } from "./ListMedicsUseCase";

let listMedicsUseCase: ListMedicsUseCase;
let medicsRepositoryInMemory: MedicsRepositoryInMemory;

describe("List medics", () => {
  beforeEach(() => {
    medicsRepositoryInMemory = new MedicsRepositoryInMemory();
    listMedicsUseCase = new ListMedicsUseCase(medicsRepositoryInMemory);
  });

  it("should be able to list all medics", async () => {
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
    const medics = await listMedicsUseCase.execute();
    expect(medics).toEqual([medic]);
  });
});
