// Base code provided by class instructor

const connection = require("../config/connection");

class DB {
  // Reference to the connection on the class
  constructor(connection) {
    this.connection = connection;   // Connect to db to perform query
  }
  findAllDepartments() {
    return this.connection.promise().query(
      "SELECT * FROM department;"
    );
  }  
  findAllRoles() {
    return this.connection.promise().query(
      "SELECT * FROM role;"
    );
  }  
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT e.id as ID, concat(e.first_name,' ',e.last_name) AS Name, e.manager_id AS Manager, r.title AS Role, r.salary AS Salary, d.name AS Department FROM employee e INNER JOIN role r ON r.id=role_id INNER JOIN department d ON d.id=department_id;"
    );
  }
  // How to add responses from prompts into queries?
  addDepartment() {
    return this.connection.promise().query(
      "INSERT INTO department (name) VALUES (PROMPT RESPONSE);"
    )
  }
  addRole() {
    return this.connection.promise().query(
      "INSERT INTO role (name) VALUES (PROMPT RESPONSE);"
    )
  }
  addEmployee() {
    return this.connection.promise().query(
      "INSERT INTO employee (name) VALUES (PROMPT RESPONSE);"
    )
  }

  }

  // Add more class methods below for all the database operations needed.
  // Sometimes you may need to pass an id value into a method so it knows 
  //   how to find the correct record.




  
}

module.exports = new DB(connection);