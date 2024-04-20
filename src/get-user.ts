import { Client } from "pg";

async function getUser(email: string) {
  const client = new Client({
    connectionString:
      "postgresql://postgres:9073@localhost:5432/learnpostgres?schema=public",
  });

  try {
    await client.connect();
    const getQuery = `SELECT * FROM users WHERE email = $1`;
    const value = [email];
    const res = await client.query(getQuery, value);
    if (res.rows?.length > 0) {
      console.log("User found", res.rows[0]);
    } else {
      console.log("No user found with this email");
    }
    console.log("done");
  } catch (error) {
    console.log("Error in connecting database", error);
  } finally {
    await client.end();
  }
}
getUser("sukomal0@gmail.com");
