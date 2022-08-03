import request from "supertest";
import { app } from "@shared/infra/http/app";
import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";
import createConnection from "@shared/infra/typeorm/index";
import { Connection } from "typeorm";

let connection: Connection;

describe("Delete a medic", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash("123", 8);

    await connection.query(
      `INSERT INTO MEDICS(id, name, ethnicity, nationality, crm, cpf, password, marital_status, birth_date, address, city, state, gender, especialization, phone_number, created_at, updated_at)
      values('${id}', 'Medico 1', 'Pardo', 'Brasileiro', 'abc123', '12345678910', '${password}', 'Solteiro', '2000-01-01 00:00:00', 'Rua 1', 'Cidade 1', 'Estado 1', 'Masculino', 'Cardiologista', '12345678900', now(), null)`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    connection.close;
  });

  it("should be able to delete a medic", async () => {
    const responseToken = await request(app).post("/sessions").send({
      cpf: "12345678910",
      password: "123",
    });

    const { refresh_token } = responseToken.body;

    const refreshToken = await request(app).post("/refresh-token").send({
      token: refresh_token,
    });

    const { token } = refreshToken.body;

    await request(app)
      .post("/medics")
      .send({
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
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const medics = await request(app)
      .get("/medics")
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .delete(`/medics/${medics.body[1].id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(204);
  });
});
