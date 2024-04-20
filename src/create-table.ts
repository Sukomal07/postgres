import { Client } from "pg";

async function createUserTable() {
  const client = new Client({
    connectionString:
      "postgresql://postgres:9073@localhost:5432/learnpostgres?schema=public",
  });

  try {
    await client.connect();
    const createTable = `
    CREATE TABLE users(
        ID SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `;
    const createAddressTable = `
    CREATE TABLE addresses(
      ID SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      city VARCHAR(100) NOT NULL,
      country VARCHAR(50) NOT NULL,
      street VARCHAR(255) NOT NULL,
      pincode VARCHAR(50) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    `;
    const res = await client.query(createTable);
    await client.query(createAddressTable);
    console.log(res);
    console.log("done");
  } catch (error) {
    console.error("Error while connecting database", error);
  } finally {
    await client.end();
  }
}

createUserTable();
