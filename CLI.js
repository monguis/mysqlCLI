const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    password: "password",
    port: 3306,
    database: "homeworkdb",
    user: "root"
}); //find out how to deploy on heroku;

// * Add departments, roles, employees

connection.connect((err) => {
    if (err) throw err;





    inquirer.prompt({
        name: "functionallity",
        type: "rawlist",
        choices: ["Add registry",
            "View current Data",
            "Update employee Role",
            "Bonus:manager update",
            "Bonus:view managers",
            "Bonus:Delete a Registry",
            "Bonus,  combined salaries"]
    }).then(({ functionallity }) => {
        console.log(functionallity);

        switch (functionallity) {
            case "Add registry":
                addData()
                break;
            case "View current Data":
                viewData()
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

});

const viewData = () => {
    inquirer.prompt({
        type: "list",
        name: "option",
        text: "What Table would you like to check?",
        choices: ["Employee", "Role", "Department"]
    }).then(({ option }) => {
        console.log()
        connection.query(`select * from ${option.toLowerCase()}`, (err, res) => {
            if (err) throw err;

            console.log(res);
            connection.end()
        })
    })

}

const addData = () => {
    inquirer.prompt({
        type: "list",
        name: "option",
        text: "What Table would you like to add?",
        choices: ["Employee", "Role", "Department"]
    }).then(({ option }) => {
        switch (option) {
            case "Employee":
                console.log("Employee")
                break;
            case "Role":
                break;
            case "Department":
                break;
        }
        connection.query(`select * from ${option.toLowerCase()}`, (err, res) => {
            if (err) throw err;

            console.log(res);
            connection.end()
        })
    })

}
// ;

//   * View departments, roles, employees

//   * Update employee roles

// Bonus points if you're able to:

//   * Update employee managers

//   * View employees by manager

//   * Delete departments, roles, and employees

//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department





