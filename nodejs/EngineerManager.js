// First, you need to install the `pg` package using npm or yarn
// npm install pg

// Importing the AWS SDK and pg for PostgreSQL connection
import AWS from 'aws-sdk';
import { Pool } from 'pg';

// Define database connection details
const pool = new Pool({
  user: 'your_database_user',
  host: 'your_database_host',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 'your_database_port',
});

// Lambda function to create an engineer
export const createEngineer = async (event) => {
  const engineer = JSON.parse(event.body); // Assuming the body is JSON
  const query = 'INSERT INTO engineers(userId, firstName, lastName, title, statusId, siteId) VALUES($1, $2, $3, $4, $5, $6)';
  const values = [engineer.userId, engineer.firstName, engineer.lastName, engineer.title, engineer.statusId, engineer.siteId];

  try {
    await pool.query(query, values);
    return { statusCode: 201, body: JSON.stringify({ message: 'Engineer created' }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};

// Other CRUD operations (updateEngineer, getEngineerById, getEngineerAll) will be implemented similarly.

