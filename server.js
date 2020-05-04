const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createProduct();
});

function init() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "Add an employee to the database",
        "Remove an employee from the database",
        "Update an employee's role",
        "Update an employee's manager",
        "Add a new type of employee role",
        "Delete a type of role from the database",
        "Add a department to to the database",
        "Remove a department from the database",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          viewAllEmployees();
          break;

        case "View all employees by department":
          viewEmployeesDept();
          break;

        case "View all employees by manager":
          viewEmployeesByManager();
          break;

        case "Add an employee to the database":
          addEmployee();
          break;

        case "Remove an employee from the database":
          deleteEmployee();
          break;

        case "Update an employee's role":
          updateEmployeeRole();
          break;

        case "Add a new type of employee role":
          addNewRole();
          break;

        case "Delete a type of role from the database":
          deleteRole();
          break;

        case "Add a department to to the database":
          addDepartment();
          break;

        case "Remove a department from the database":
          deleteDepartment();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role",
        type: "list",
        message: "What is the employee's role?",
        choices: [
          "Salesperson",
          "Sales Lead",
          "Software Engineer",
          "Lead Engineer",
          "Accountant",
          "Lawyer",
          "Legal Team Lead",
        ],
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,(select id from role where title=?))",
        [answer.firstName, answer.lastName, answer.role],
        function (err, res) {
          if (err) throw err;
          console.log("----------------------------");
          console.log(answer.firstName + " has been added to the database.");
          viewEmployees();
          console.log("----------------------------");
          init();
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "editEmployee",
        type: "input",
        message:
          "What is the last name of the employee you would like to update?",
      },
      {
        name: "role",
        type: "list",
        message: "What is their new role?",
        choices: [
          "Salesperson",
          "Sales Lead",
          "Software Engineer",
          "Lead Engineer",
          "Accountant",
          "Lawyer",
          "Legal Team Lead",
        ],
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id = (select id from role where title=?) WHERE last_name = ?;",
        [answer.role, answer.editEmployee],

        function (err, res) {
          if (err) throw err;
          console.log("----------------------------");
          console.log(answer.editEmployee + " has had their role updated.");
          console.log("----------------------------");
          init();
        }
      );
    });
}

function deleteEmployee() {
  inquirer
    .prompt([
      {
        name: "deleteEmployee",
        type: "input",
        message:
          "What is the last name of the employees you would like to delete?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "DELETE FROM employee WHERE last_name = ?",
        [answer.deleteEmployee],
        function (err, res) {
          if (err) throw err;
          console.log("----------------------------");
          console.log(
            answer.deleteEmployee + " has been deleted from the database."
          );
          console.log("----------------------------");
          init();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "What is the new department's name?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.departmentName],
        function (err, res) {
          if (err) throw err;
          console.log("----------------------------");
          console.log(answer.firstName + " has been added to the database.");
          viewEmployees();
          console.log("----------------------------");
          init();
        }
      );
    });
}

function deleteDepartment() {
  inquirer
    .prompt([
      {
        name: "deleteDepartment",
        type: "list",
        message: "What is the department you would like to delete?",
        choices: ["Sales", "Engineering", "Finance", "Legal"],
      },
    ])
    .then(function (answer) {
      connection.query("DELETE FROM department WHERE name = ?", function (
        err,
        res
      ) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.log(res);
        init();
      });
    });
}

function addNewRole() {
  inquirer
    .prompt([
      {
        name: "newRoleName",
        type: "input",
        message: "What is the title of the new role?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role (name) VALUES (?)",
        [answer.newRoleName],
        function (err, res) {
          if (err) throw err;
          console.log("----------------------------");
          console.log(answer.firstName + " has been added to the database.");
          viewEmployees();
          console.log("----------------------------");
          init();
        }
      );
    });
}

function deleteRole() {
  inquirer
    .prompt([
      {
        name: "deleteRole",
        type: "list",
        message: "What is the title of the role you would like to delete?",
        choices: [
          "Salesperson",
          "Sales Lead",
          "Software Engineer",
          "Lead Engineer",
          "Accountant",
          "Lawyer",
          "Legal Team Lead",
        ],
      },
    ])
    .then(function (answer) {
      connection.query("DELETE FROM department WHERE name = ?", function (
        err,
        res
      ) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.log(res);
        init();
      });
    });
}

function viewAllEmployees() {
  console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}

function viewEmployeesByManager() {
  inquirer
    .prompt({
      name: "manager",
      type: "list",
      message: "Which manager's team would you like to see?",
      choices: ["Ashley Rodriguez", "John Doe", "Sarah Lourd", "Mike Chan"],
    })
    .then(function (answer) {
      console.log("Selecting all employees...\n");
      connection.query("SELECT * FROM employee WHERE manager_id ?", function (
        err,
        res
      ) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
      });
    });
}

function viewEmployeesDept() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}
