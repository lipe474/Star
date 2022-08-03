// import { AppError } from "@shared/errors/AppError";
// import { ICreateMedicDTO } from "@modules/medics/dtos/ICreateMedicDTO";
// import { MedicsRepositoryInMemory } from "@modules/medics/repositories/in-memory/MedicsRepositoryInMemory";
// import { CreateMedicUseCase } from "../../medics/useCases/createMedic/CreateMedicUseCase";
// import { MedicsTokensRepositoryInMemory } from "@modules/medics/repositories/in-memory/MedicsTokensRepositoryInMemory";
// import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
// import { AuthenticateMedicUseCase } from "./AuthenticateMedicUseCase";

// let authenticateMedicUseCase: AuthenticateMedicUseCase;
// let medicsRepositoryInMemory: MedicsRepositoryInMemory;
// let medicsTokensRepositoryInMemory: MedicsTokensRepositoryInMemory;
// let dateProvider: DayjsDateProvider;
// let createMedicUseCase: CreateMedicUseCase;

// describe("Authenticate Medic", () => {
//   beforeEach(() => {
//     medicsRepositoryInMemory = new MedicsRepositoryInMemory();
//     medicsTokensRepositoryInMemory = new MedicsTokensRepositoryInMemory();
//     dateProvider = new DayjsDateProvider();
//     authenticateMedicUseCase = new AuthenticateMedicUseCase(
//       medicsRepositoryInMemory
//     );
//     createMedicUseCase = new CreateMedicUseCase(medicsRepositoryInMemory);
//   });
//   it("should be able to authenticate an medic", async () => {
//     const medic: ICreateMedicDTO = {
//       name: "Medic Supertest",
//       ethnicity: "test",
//       nationality: "test",
//       crm: "abc123",
//       cpf: "121244",
//       password: "123",
//       marital_status: "test",
//       birth_date: new Date("2000-12-12 00:00:00"),
//       address: "test",
//       city: "test",
//       state: "test",
//       gender: "test",
//       especialization: "cardiologist",
//       phone_number: "1000",
//     };
//     await createMedicUseCase.execute(medic);

//     const result = await authenticateMedicUseCase.execute({
//       cpf: medic.cpf,
//       password: medic.password,
//     });

//     expect(result).toHaveProperty("token");
//   });

//   it("should not be able to authenticate an non-existing medic", async () => {
//     await expect(
//       authenticateMedicUseCase.execute({
//         cpf: "000",
//         password: "0",
//       })
//     ).rejects.toEqual(new AppError("Cpf or password incorrect!"));
//   });

//   it("should not be able to authentica with incorrect password", async () => {
//     const medic: ICreateMedicDTO = {
//       name: "Medic Supertest",
//       ethnicity: "test",
//       nationality: "test",
//       crm: "abc123",
//       cpf: "121244",
//       password: "123",
//       marital_status: "test",
//       birth_date: new Date("2000-12-12 00:00:00"),
//       address: "test",
//       city: "test",
//       state: "test",
//       gender: "test",
//       especialization: "cardiologist",
//       phone_number: "1000",
//     };
//     await createMedicUseCase.execute(medic);

//     await expect(
//       authenticateMedicUseCase.execute({
//         cpf: medic.cpf,
//         password: "0",
//       })
//     ).rejects.toEqual(new AppError("Cpf or password incorrect!"));
//   });
// });
