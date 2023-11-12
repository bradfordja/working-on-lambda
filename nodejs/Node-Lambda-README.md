### NodeJs back-end code with Lambda Nodejs api function

export interface Engineer {
    userId: number;
    firstName: string;
    lastName: string;
    fullName: string;
    title: string;
    statusId: number;
    siteId: number;
    siteName?: string;
    status?: string;
  }


To build a Node.js API using AWS Lambda to manage engineer records, we'll need to set up several components within AWS and implement our Lambda functions with the required functionality.

### AWS System Requirements:

1. **AWS Lambda**:
   - For running our Node.js code.
2. **Amazon RDS**:
   - To store engineer records in a relational database.
3. **IAM Role**:
   - With policies allowing Lambda to access RDS and other necessary services.
4. **Amazon API Gateway** (optional):
   - To expose our Lambda functions as HTTP endpoints.
5. **AWS SDK for JavaScript (Node.js)**:
   - To interact with AWS services within our Lambda functions.
6. **Database Connection Pooling**:
   - For efficient database connections management, we will use a library like `pg` for PostgreSQL or `mysql` for MySQL.

### Setting IAM Permissions:

1. Create an IAM role for the Lambda function.
2. Attach policies that grant permissions to access RDS and other required AWS services.
3. Ensure that the policy allows Lambda functions to be invoked from API Gateway if you're using it.

### Sample Use-Case:

- **createEngineer**: Adds a new engineer record to the database.
- **updateEngineer**: Updates an existing engineer's details in the database.
- **getEngineerById**: Retrieves details of a specific engineer by their userId.
- **getEngineerAll**: Lists all engineers in the database.

### Implementation Steps:

1. **Set up an RDS instance** and create a table for engineers.
2. **Define an IAM role** with the necessary permissions.
3. **Implement Lambda functions** for each operation.
4. **Deploy the Lambda functions** and optionally set up API Gateway to trigger the functions.

### Sample Code:

Below is a simplified example of how the Lambda functions might look. This code assumes the use of a PostgreSQL database and the `pg` npm module for connection pooling.

```javascript
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
```

### Modules, Components, Services, Models:

- **Modules**:
  - AWS SDK, pg (or another database driver based on the database used), possibly `express` or another framework if using Lambda with a web server model.
- **Components**:
  - Lambda functions for CRUD operations.
- **Services**:
  - Amazon RDS for data persistence.
  - IAM for authentication and permissions.
  - Optionally, Amazon API Gateway for HTTP interface.
- **Models**:
  - The `Engineer` interface as defined in your requirement would be represented as a table in RDS.

Keep in mind that this is a simplified example and does not include input validation, error handling, or connection pool management that you would want in a production system. You also need to ensure that the Lambda function's execution role has the necessary permissions to interact with the RDS instance and any other AWS services that it needs to access.