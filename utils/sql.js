// "View all employees",
// "View all employees by Department",
// "View all employees by Manager",
// "Add Employee",
// "Add Manager",
// "Remove Employee",
// "Update Employee Role",
// "Update Employee Manager",
//     "View all Roles",

const query = (table, id) => {
  const queryAllEmployees = `SELECT * FROM ${table}`;
  // cosnt queryEmployeesByDepartment = `SELECT * FROM ${table} `
  return queryAllEmployees;
};

module.exports = query;
