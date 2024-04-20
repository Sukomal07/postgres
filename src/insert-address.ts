import { Client } from "pg";

async function insertData(
  user_id: number,
  city: string,
  country: string,
  street: string,
  pincode: number
) {
  const client = new Client({
    connectionString:
      "postgresql://postgres:9073@localhost:5432/learnpostgres?schema=public",
  });
  try {
    await client.connect();
    const insertQuery = `INSERT INTO addresses(user_id, city, country, street, pincode) VALUES($1, $2, $3, $4, $5)`;
    const values = [user_id, city, country, street, pincode];
    const res = await client.query(insertQuery, values);
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
}
insertData(1, "kgp", "India", "chakkalindi", 721301);
