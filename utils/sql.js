// "View all employees",
// "View all employees by Manager",
// "Add Employee",
// "Add Manager",
// "Remove Employee",
// "Update Employee Role",
// "Update Employee Manager",
//     "View all Roles",

const db = require("../db/connection");
const inquirer = require("inquirer");
let Table = require("easy-table");

const viewAllEmployees = async () => {
  const sql = `Select 
        e.id, e.first_name, e.last_name, title, name as department, salary, m.first_name as manager
        FROM employee e
        JOIN employee m ON e.manager_id=m.id
        LEFT JOIN roles ON e.role_id=roles.id
        LEFT JOIN department ON department.id=roles.department_id`;
  await db
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      console.table(Table.print(rows));
      console.log("\n");
    })
    .catch((err) => console.log(err));
  return;
};

const viewAllEmployeesByDepartmentId = () => {
  db.promise()
    .query(`SELECT name FROM department`)
    .then(([rows, fields]) => {
      inquirer
        .prompt({
          type: "list",
          name: "department",
          message: "Enter the department",
          choices: rows,
        })
        .then((data) => {
          const sql = `Select
            department.id, department.name, employee.first_name, employee.last_name, salary
            FROM department
            LEFT JOIN roles ON department.id=roles.department_id
            LEFT JOIN employee ON employee.role_id=roles.id
            WHERE department.name= ?`;
          db.promise()
            .query(sql, data.department)
            .then(([rows, fields]) => {
              console.table(Table.print(rows));
              console.log("\n");
            })
            .catch((err) => console.log(err));
        });
    })
    .catch((err) => console.log(err));
};

const getManagers = async () => {
  const sql = `SELECT DISTINCT m.first_name FROM employee e JOIN employee m ON e.manager_id=m.id`;
  let managers = [];
  await db
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      rows.map((el) => {
        managers.push(el.first_name);
      });
    })
    .catch((err) => console.log(err));
  return managers;
};

let roles = async () => {
  let role = [];
  const sql = "SELECT title FROM roles";
  await db
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      rows.map((el) => {
        role.push(el.title);
      });
    })
    .catch((err) => console.log(err));
  return role;
};

const addEmployee = () => {
  //   console.log(roles);
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the First Name",
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log("Enter the employees first name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the Last Name",
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log("Enter the employees Last name");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "role",
        message: "Choose a role for the employee",
        choices: roles,
      },
      {
        type: "list",
        name: "manager",
        message: "Choose a manager for the employee",
        choices: getManagers,
      },
    ])
    .then((data) => {
      console.log(data);
      console.log("\n");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  viewAllEmployees,
  viewAllEmployeesByDepartmentId,
  addEmployee,
};
