// Base code provided by class instructor

const { prompt } = require('inquirer');
const fs = require('fs');
const logo = require("asciiart-logo");
require("console.table");

// Class to contain all our database queries
const db = require("./db");
const { findAllEmployees } = require('./db');

// Use this function to display the ascii art logo and to begin the main prompts
function init() {


  loadMainPrompts()
}
// Initial prompts with a series of options
function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View all Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "View all Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "View all Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE",
        },
        {
          name: "Add an Employee",
          value: "ADD_EMPLOYEE"
        },        
        {
          name: "Update an Employee Role",
          value: "UPDATE_EMPLOYEE"
        }        
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    // Call the appropriate function depending on what the user chose
    switch (choice) {
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      /*
        case "ADD_MANAGER":
        isManager();
        break;
      */     
      case "UPDATE_EMPLOYEE":
        updateEmployee();
        break;      
    }
  }
  )
}
/* ======= Controllers ============================================================ */
function viewDepartments() {
  // Call the method in the db file for finding all departments
  // Get the result back, and then display the result
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadMainPrompts());
}
function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => loadMainPrompts());
}
function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}
function addDepartment() {
  prompt([
    {
      type: "input",
      message: "What is the name of the new department?",
      name: "department"
    }
  ])
    .then(db.addDepartment)
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
      console.log("Department added successfully!");
    })
    .then(() => loadMainPrompts());
}
function addRole() {
  prompt([
    {
      type: "input",
      message: "What is the title of the new role?",
      name: "title"
    },
    {
      type: "input",
      message: "What is the salary of the new role?",
      name: "salary"
    },
    {
      type: "input",
      message: "What is the department ID of the new role?",
      name: "department_id"
    }
  ])
    .then(db.addRole)
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
      console.log("Role added successfully!");
    })
    .then(() => loadMainPrompts());
}
function addEmployee() {
  db.findAllRoles().then(([roles]) => {
    let roleList = roles.map(role => {
      return { name: role.title, value: role.id }
    })
    db.findAllEmployees().then(([employees]) => {
      let employeeList = employees.map(employee => {
        return { name: employee.Name, value: employee.ID }
      })
      employeeList.push({ name: "no manager", value: null })
      prompt([
        {
          type: "input",
          message: "What is the first name of the new employee?",
          name: "first_name"
        },
        {
          type: "input",
          message: "What is the last name of the new employee?",
          name: "last_name"
        },
        {
          type: "list",
          message: "What is the role of the new employee?",
          name: "role_id",
          choices: roleList
        },
        {
          type: "list",
          message: "Who is the employee's manager?",
          name: "manager",
          choices: employeeList
        }
      ])
        .then(db.addEmployee)
        .then(([rows]) => {
          let employees = rows;
          console.log("\n");
          console.table(employees);
          console.log("Employee added successfully!");
        })
        .then(() => loadMainPrompts());
    })
  })
}
/*
function isManager() {
  prompt([
    {
      type: "input",
      message: "What is the ID of the manager?",
      value: "manager_id"
    }
  ])
    .then // INSERT input to db / Call isManager()
}
*/
function updateEmployee() {
  db.findAllRoles().then(([roles]) => {
    let roleList = roles.map(role => {
      return { name: role.title, value: role.id }
    })
    db.findAllEmployees().then(([employees]) => {
      let employeeList = employees.map(employee => {
        return { name: employee.Name, value: employee.ID }
      })
      employeeList.push({ name: "no manager", value: null })
      prompt([
        {
          type: "list",
          message: "Which employee would you like to update?",
          name: "employee",
          choices: employeeList
        },
        {
          type: "list",
          message: "What is the new role of the employee?",
          name: "role_id",
          choices: roleList
        }
      ])
      .then(db.updateEmployee)
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
        console.log("Employee updated successfully!");
      })
      .then(() => loadMainPrompts());
  })
})
}
/* ======= END Controllers ============================================================ */

// Everything starts here!
init();