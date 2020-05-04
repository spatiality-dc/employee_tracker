const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "B*ffp3t7bX5SkNO>",
  database: "employee_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createProduct();
});

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
        type: "input",
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
        type: "input",
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

function viewAllEmployees() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}
