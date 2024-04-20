import { Client } from "pg";

async function insertData(username: string, email: string, password: string) {
  const client = new Client({
    connectionString:
      "postgresql://postgres:9073@localhost:5432/learnpostgres?schema=public",
  });
  try {
    await client.connect();
    const insertQuery =
      "INSERT INTO Users(username, email, password) VALUES($1, $2, $3)";
    const values = [username, email, password];
    await client.query(insertQuery, values);
    console.log("done");
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}
insertData("sukomal03", "sukomal03@gmail.com", "1234");
