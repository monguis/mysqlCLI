const inquirer = require("inquirer");
const mysql = require("mysql");

// mysql.createConnection(); //find out how to deploy on heroku;

// * Add departments, roles, employees
inquirer.prompt({name:"functionallity",
type:"rawlist",
choices:["Add registry",
"View current Data",
"Update employee Role",
"Bonus:manager update",
"Bonus:view managers",
"Bonus:Delete a Registry",
"Bonus,  combined salaries"]}).then(({functionallity})=>{
console.log(functionallity);

switch(functionallity) {
    case "Add registry":
        break;
        case "View current Data":
        break;
        case "Update employee Role":
        break;
        case "Bonus:manager update":
        break;
        case "Bonus:view managers":
        break;
        case "Bonus:Delete a Registry":
        break;
        case "Bonus,  combined salaries":
        break;

}

});



const viewRegistry = (artist,table) => {
   
    connection.query(`SELECT * year FROM ? WHERE title = ?`, [table,artist], (err, res) => {
        if (err) throw err;

        console.log(res);
    })
}

//   * View departments, roles, employees

//   * Update employee roles

// Bonus points if you're able to:

//   * Update employee managers

//   * View employees by manager

//   * Delete departments, roles, and employees

//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department





