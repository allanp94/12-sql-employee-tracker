const db = require("../db/connection");
const inquirer = require("inquirer");
let Table = require("easy-table");

const viewAllEmployees = () => {
  const sql = `Select 
        e.id, e.first_name, e.last_name, title, name as department, salary, m.first_name as manager
        FROM employee e
        JOIN employee m ON e.manager_id=m.id
        LEFT JOIN roles ON e.role_id=roles.id
        LEFT JOIN department ON department.id=roles.department_id`;
  db.promise()
    .query(sql)
    .then(([rows, fields]) => {
      console.table(Table.print(rows));
    })
    .catch((err) => console.log(err));
};

const viewAllRoles = () => {
  const sql = "SELECT title, salary, department_id FROM roles";
  db.promise()
    .query(sql)
    .then(([rows, fields]) => {
      console.table(Table.print(rows));
    })
    .catch((err) => console.log(err));
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
            })
            .catch((err) => console.log(err));
        });
    })
    .catch((err) => console.log(err));
};

const getManagers = async () => {
  const sql = `SELECT DISTINCT e.first_name, e.manager_id FROM employee e JOIN employee m ON e.manager_id=m.id`;
  let managers = [];
  await db
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      rows.map((el) => {
        let name = `Name: ${el.first_name}, Manager_Id: ${el.manager_id}`;
        managers.push(name);
      });
    })
    .catch((err) => console.log(err));
  return managers;
};

const getEmployees = async () => {
  const sql = `Select 
        e.id, e.first_name, e.last_name, title, name as department, salary, m.first_name as manager
        FROM employee e
        JOIN employee m ON e.manager_id=m.id
        LEFT JOIN roles ON e.role_id=roles.id
        LEFT JOIN department ON department.id=roles.department_id`;
  let employees = [];
  await db
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      rows.map((el) => {
        let name = `Id: ${el.id} -- First_Name: ${el.first_name} -- Last_Name: ${el.last_name} -- Title: ${el.title} -- Department: ${el.department} -- Manager: ${el.manager}`;
        employees.push(name);
      });
    })
    .catch((err) => console.log(err));
  return employees;
};

let roles = async () => {
  let role = [];
  const sql = "SELECT title, id FROM roles";
  await db
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      rows.map((el) => {
        role.push(`${el.title} -- Id ${el.id}`);
      });
    })
    .catch((err) => console.log(err));
  return role;
};

const addEmployee = () => {
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
      let roleId = data.role.split(" ");
      roleId = roleId[roleId.length - 1];
      let managerId = data.manager.split(" ");
      managerId = managerId[managerId.length - 1];

      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
      const params = [data.first_name, data.last_name, roleId, managerId];
      db.promise()
        .query(sql, params)
        .then((data) => {
          viewAllEmployees();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const employeeByManager = () => {
  inquirer
    .prompt({
      type: "list",
      name: "manager",
      message: "Select the manager",
      choices: getManagers,
    })
    .then((data) => {
      let managerId = data.manager.split(" ");
      managerId = managerId[managerId.length - 1];

      const sql = `Select 
    e.id, e.first_name, e.last_name, title, name as department, salary, m.first_name as manager
    FROM employee e
    JOIN employee m ON e.manager_id=m.id
    LEFT JOIN roles ON e.role_id=roles.id
    LEFT JOIN department ON department.id=roles.department_id
    WHERE m.id = ?`;
      const params = [managerId];
      db.promise()
        .query(sql, params)
        .then(([rows, fields]) => {
          console.table(Table.print(rows));
        })
        .catch((err) => console.log(err));
    });
};

const addManager = () => {
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
            console.log("Enter the managers first name");
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
            console.log("Enter the managers Last name");
            return false;
          }
        },
      },
    ])
    .then((data) => {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
      const params = [data.first_name, data.last_name, 5, 5];
      db.promise()
        .query(sql, params)
        .then((data) => {
          const sql = `Select 
            e.id, e.first_name, e.last_name, title, name as department, salary
            FROM employee e
            LEFT JOIN roles ON e.role_id=roles.id
            LEFT JOIN department ON department.id=roles.department_id
            WHERE roles.id = ?`;
          const params = [5];
          db.promise()
            .query(sql, params)
            .then(([rows, fields]) => {
              console.table(Table.print(rows));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
};

const removeEmployee = () => {
  inquirer
    .prompt({
      type: "list",
      name: "employee",
      message: "Select the employee you want to remove",
      choices: getEmployees,
    })
    .then((data) => {
      let employeeId = data.employee.split(" ");
      employeeId = employeeId[1];
      const sql = `DELETE FROM employee WHERE employee.id = ?`;
      const params = [employeeId];
      db.promise()
        .query(sql, params)
        .then(([rows, fields]) => {
          viewAllEmployees();
        })
        .catch((err) => console.log(err));
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt({
      type: "list",
      name: "employee",
      message: "Select the employee you want to update",
      choices: getEmployees,
    })
    .then((data) => {
      inquirer
        .prompt({
          type: "list",
          name: "role",
          message: "Select the employees new role",
          choices: roles,
        })
        .then((roleData) => {
          let role = roleData.role.split(" ");
          role = role[role.length - 1];
          let employeeId = data.employee.split(" ");
          employeeId = employeeId[1];

          const sql = `UPDATE employee
                SET role_id = ${role}
                WHERE employee.id = ?`;
          const params = [employeeId];
          db.promise()
            .query(sql, params)
            .then(([rows, fields]) => {
              viewAllEmployees();
            })
            .catch((err) => console.log(err));
        });
    });
};

const updateEmployeeManager = () => {
  inquirer
    .prompt({
      type: "list",
      name: "employee",
      message: "Select the employee you want to update",
      choices: getEmployees,
    })
    .then((data) => {
      inquirer
        .prompt({
          type: "list",
          name: "manager",
          message: "Select the employees new manager",
          choices: getManagers,
        })
        .then((managerData) => {
          let managerId = managerData.manager.split(" ");
          managerId = managerId[managerId.length - 1];
          let employeeId = data.employee.split(" ");
          employeeId = employeeId[1];

          const sql = `UPDATE employee
                SET manager_id = ${managerId}
                WHERE id = ?`;
          const params = [employeeId];
          db.promise()
            .query(sql, params)
            .then(([rows, fields]) => {
              viewAllEmployees();
            })
            .catch((err) => console.log(err));
        });
    });
};

module.exports = {
  viewAllEmployees,
  viewAllEmployeesByDepartmentId,
  addEmployee,
  employeeByManager,
  addManager,
  removeEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  viewAllRoles,
};
