import createConnection from "../index";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash("123", 8);

  await connection.query(
    `INSERT INTO TEACHERS(id, name, ethnicity, nationality, crm, cpf, titration, password, marital_status, birth_date, address, city, state, gender, especialization, phone_number, created_at, updated_at)
    values('${id}', 'Docente 1', 'Pardo', 'Brasileiro', 'abc12345', '12345678912', 'Titular', '${password}', 'Solteiro', '2000-01-01 00:00:00', 'Rua 1', 'Cidade 1', 'Estado 1', 'Masculino', 'Cardiologista', '12345678900', now(), null)`
  );
  connection.close;
}

create().then(() => console.log("User teacher created"));
