import { Client } from "pg";

async function getUserWithAddress(userId: number) {
  const client = new Client({
    connectionString:
      "postgresql://postgres:9073@localhost:5432/learnpostgres?schema=public",
  });
  try {
    await client.connect();
    const query =
      "SELECT users.id, users.username, users.email, address.city, address.country, address.street, address.pincode FROM users JOIN addresses address ON users.id = address.user_id WHERE users.id = $1";
    const values = [userId];
    const res = await client.query(query, values);
    if (res.rows.length > 0) {
      console.log(res.rows[0]);
    } else {
      console.log("No data found with this userId");
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
}
getUserWithAddress(2);
