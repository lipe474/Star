import { MedicsRepositoryInMemory } from "@modules/medics/repositories/in-memory/MedicsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DeleteMedicUseCase } from "./DeleteMedicUseCase";

let deleteMedicUseCase: DeleteMedicUseCase;
let medicsRepositoryInMemory: MedicsRepositoryInMemory;

describe("Delete medic", () => {
  beforeEach(() => {
    medicsRepositoryInMemory = new MedicsRepositoryInMemory();
    deleteMedicUseCase = new DeleteMedicUseCase(medicsRepositoryInMemory);
  });

  it("should be able to delete a medic", async () => {
    const medic = await medicsRepositoryInMemory.create({
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
    await deleteMedicUseCase.execute(medic.id);

    expect(deleteMedicUseCase).not.toContainEqual(medic);
  });

  it("should not be able to delete an non-existing medic", async () => {
    await expect(deleteMedicUseCase.execute("fakeID")).rejects.toEqual(
      new AppError("Medic does not exists!")
    );
  });
});
