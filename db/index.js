// Base code provided by class instructor

const connection = require("../config/connection");

class DB {
  // Reference to the connection on the class
  constructor(connection) {
    this.connection = connection;
    // When I pass `res` through these functions, it messes stuff up...temp solution: bind
    this.addDepartment = this.addDepartment.bind(this)
    this.addRole = this.addRole.bind(this)
    this.addEmployee = this.addEmployee.bind(this)
    this.updateEmployee = this.updateEmployee.bind(this)
    this.deleteEmployee = this.deleteEmployee.bind(this)
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
  addDepartment(res) {
    return this.connection.promise().query(
      "INSERT INTO department (name) VALUES (?);", [res.department]
    );
  }
  addRole(res) {
    return this.connection.promise().query(
      "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);", [res.title, res.salary, res.department_id]
    );
  }
  addEmployee(res) {
    return this.connection.promise().query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);", [res.first_name, res.last_name, res.role_id, res.manager]
    );
  }
  /*
  isManager() {
    return this.connection.promise().query(
      "QUERY"
    );
  }
  */
  updateEmployee(res) {
    return this.connection.promise().query(
      // Why isn't this working? Doesn't throw error, but doesn't update role for selected employee
      "UPDATE employee SET role_id = ? WHERE id = ?;", [res.role_id, res.employee]
    );
  }
  deleteEmployee(res) {
    return this.connection.promise().query(
      // Why isn't this working? Doesn't throw error, but doesn't delete selected employee
      "DELETE FROM employee WHERE id = ?;", [res.employee]
    );
  }
}

module.exports = new DB(connection);