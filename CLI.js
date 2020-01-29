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

    mainMenu()

});

const viewData = () => {
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "What Table would you like to check?",
        choices: ["Employee", "Role", "Department"]
    }).then(({ option }) => {
        console.log()
        connection.query(`select * from ${option.toLowerCase()}`, (err, res) => {
            if (err) throw err;

            console.log(res);
            mainMenu()
        })
    })
}



const addData = () => {
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "What Table would you like to add?",
        choices: ["Employee", "Role", "Department"]
    }).then(({ option }) => {

        inquirer.prompt(generateQuestions(option)).then(resp => {
            let columns = [];
            let values = [];
            for (key in resp) {
                columns.push([key]);
                values.push(resp[key]);
                // marks +="?";/
            }

            connection.query(`INSERT INTO ?? (??) VALUES (?)`, [option.toLowerCase(), columns, values], (err, res) => {
                if (err) throw err;

                mainMenu()
            })
        })
    })

}

const updateData = () => {

    // var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
    // query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    // query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

    connection.query(`select employee.id,employee.first_name,employee.last_name,role.title 
        from employee INNER JOIN role ON (employee.role_id = role.id)`, (err, res) => {
        if (err) throw err;
console.log("\n Employee table");

        for (const result of res) {
            console.log(`id: ${result.id} || ${result.first_name} ${result.last_name} || ${result.title}`)
        }

        inquirer.prompt({
            type: "list",
            name: "employeeId",
            message: "What employee needs a role change?",
            choices: res.map(elt => elt.id)
        }).then(({ employeeId }) => {
            connection.query("SELECT title,id from role", (err, res) => {
                if (err) throw err;

                console.log("\n Roles table");

                for (const result of res) {
                    console.log(`id: ${result.id} || ${result.title}`)
                }
                inquirer.prompt({
                    type: "list",
                    name: "roleId",
                    message: "What's the new role'",
                    choices: res.map(elt => elt.id)
                }).then(({ roleId }) => {
                    console.log(roleId, employeeId)
                    connection.query(`UPDATE employee SET ? WHERE ?`,[{role_id:roleId},{id:employeeId}],(err) => {
                        if(err)throw err
                        mainMenu()
                    });
                    
                })
            });

            // console.log(option);
        });

    });



}

const generateQuestions = (option) => {
    const questionArr = [];
    switch (option) {
        case "Employee":
            questionArr.push(
                {
                    type: "input",
                    name: "first_name",
                    message: "First name?"
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "Last name?"
                },
                {
                    type: "input",   // call database to link foreign key
                    name: "role_id",
                    message: "Role?"
                })
            break;
        case "Role":
            questionArr.push(
                {
                    type: "input",
                    name: "title",
                    message: "role title?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "salary?"
                },
                {
                    type: "input",
                    name: "department_id",
                    message: "belonging department?" // call database to link foreign key
                });
            break;
        case "Department":
            questionArr.push(
                {
                    type: "input",
                    name: "department",
                    message: "Department name?"
                });
            break;
        default:
            return "not a valid input"
    }
    return questionArr;
}


const mainMenu = () => {

    inquirer.prompt({
        name: "functionallity",
        type: "rawlist",
        message: "What would you like to do today?",
        choices: ["Add registry",
            "View current Data",
            "Update employee Role",
            "Bonus:manager update",
            "Bonus:view managers",
            "Bonus:Delete a Registry",
            "Bonus,  combined salaries",
            "exit"
        ]
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
                updateData()
                break;
            case "Bonus:manager update":
                break;
            case "Bonus:view managers":
                break;
            case "Bonus:Delete a Registry":
                break;
            case "Bonus,  combined salaries":
                break;
            case "exit":
                connection.end()
                return false;

        }

    });
}
//   * Update employee roles

// Bonus points if you're able to:

//   * Update employee managers

//   * View employees by manager

//   * Delete departments, roles, and employees

//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department





