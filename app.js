const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");  
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

// questions for all employees 
const employeeQuestions = [
    {
        type: "input",
        name: "memberName",
        message: "Please enter the employee's name:",
        validate: function (value) {
            if ((/.+/).test(value)) { return true; }
            return 'Name is required';
        }
    },
    {
        type: "list",
        message: "What role does this member have?",
        name: "role",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]
    },
    {
        type: "number",
        name: "id",
        message: "Please enter the team member's id:"
    },
    {
        type: "input",
        name: "email",
        message: "Please enter the team member's email address:"
    }];

// question only for managers
let mgrQuestion = [
    {
        type: "input",
        name: "office",
        message: "Where is this member's office?",
        validate: function (value) {
            if ((/.+/).test(value)) { return true; }
            return 'Office is required';
        }
    }];

// question only for engineers
let engQuestion = [
    {
        type: "input",
        name: "github",
        message: "What is this member's github username?"
    }];

// question only for interns
let internQuestion = [
    {
        type: "input",
        name: "school",
        message: "What is this member's school?",
        validate: function (value) {
            if ((/.+/).test(value)) { return true; }
            return 'School is required';
        }
    }];

// get "team name" for header     
const teamNameQuestion = [
    {
        type: "input",
        name: "teamName",
        message: "What is name of your team?"
    }];

// are any more employees?  
const moreEmployees = [
    {
        type: "confirm",
        name: "more",
        message: "Do you have more employees to enter?"
    }];


mgrQuestions = mgrQuestion.concat(moreEmployees); 
internQuestions = internQuestion.concat(moreEmployees); 
engQuestions = engQuestion.concat(moreEmployees); 

var teamMembers = [];   // team members
var isMore = true; 

buildTeam();  

function buildTeam() {


    inquirer.prompt(teamNameQuestion)
        .then(answer => {
            teamName = answer.teamName;
            console.log('Please enter the manager of this team first.');

            oneEmployee();   // will recurse until no more employees 

            //  user said no more employees, ready to write the html file 
            // writePage();
            
        });
        
    }
    
    function oneEmployee() {
        
        inquirer.prompt(employeeQuestions)
            .then(answers => {
                const { memberName, role, id, email } = answers;
                switch (role) {
                    case "Manager":
                        inquirer.prompt(mgrQuestions).then(answer => {
                            let employee = new Manager(memberName, id, email, answer.office);
                            teamMembers.push(employee);
                            if (answer.more) oneEmployee(); 
                            else { 
                                writePage(); return; 
                            }  
                        });
                        break;
    
                    case "Engineer":
                        inquirer.prompt(engQuestions).then(answer => {
                            let employee = new Engineer(memberName, id, email, answer.github);
                            teamMembers.push(employee);
                            if (answer.more) oneEmployee(); 
                            else { 
                                writePage(); return; 
                            } 
                        });
                        break;
    
                    case "Intern":
                        inquirer.prompt(internQuestions).then(answer => {
                            let employee = new Intern(memberName, id, email, answer.school);
                            teamMembers.push(employee);
                            if (answer.more) oneEmployee(); 
                            else { 
                                writePage(); return; 
                            }  
                        });
                        break;
                }
    
            });
    
            function writePage() {
                
                let topDog = teamMembers[0]; 
                let topRole = topDog.getRole(); 


                var generatedHTML = `
                <!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
                    <title>${teamName}</title>
                </head>
                <style>
                    .headerarea {
                        width: 100% !important;
                        background-color: lavender;
                        color: black;
                        font-size: xx-large;
                        font-weight: bold;
                        text-align: center;
                        padding: 2rem 5rem;
                    }
                
                    .card-header {
                        background-color: midnightblue;
                        color: white;
                        font-size: x-large;
                        font-weight: bold;
                    }
                
                    hr.newdept {
                        border-top: 2px solid #999;
                    }
                
                    hr.subord {
                        border-top: 1px solid #bbb;
                    }
                
                    .card-body {
                        background-color: #eee;
                    }
                
                    .infotable {
                        width: 80%;
                        background-color: white;
                        border: 1px solid #ccc;
                        text-align: left;
                    }
                </style>
                
                <body>
                    <div class="headerarea">
                        <h1>Department Staff: ${teamName}</h1>
                    </div>
                
                    <!-- top manager on a row by themselves -->
                    <div class="container">
                        <div class="row justify-content-center mt-4">
                            <div class="col-12 col-lg-4">
                
                                <div class="card shadow">
                                    <div class="card-header text-left">
                                        ${topDog.name} <br>
                                        <i class="fa fa-coffee"></i> Manager
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">${topDog.getRole()}</h5>
                                        <p class="card-text bg-light">
                                            <div class="btn-group-vertical">
                                                <button type="button" class="btn infotable">ID: ${topDog.id}</button>
                                                <button type="button" class="btn infotable">Email: ${topDog.email}</button>
                                                <button type="button" class="btn infotable">Office: ${topDog.getOfficeNumber()}</button>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <hr class=" newdept">
                    <div class="container">
                    <!-- all other members of team -->
                    <div class="row">
                `; 
                for (let i = 1; i < teamMembers.length; i++) {
                    let employee = teamMembers[i]; 
                    let icon = "";  
                    let role = employee.getRole(); 
                    let optionTitle = "" ; 
                    let optionValue = "";  
                    switch (role) {
                        case "Manager": 
                            icon = "fa-coffee"; 
                            optionTitle = "Office:";
                            optionValue = employee.getOfficeNumber(); 
                            break;
                        case "Engineer": 
                            icon = "fa-wrench"; 
                            optionTitle = "Github:";
                            optionValue = employee.getGithub(); 
                            break; 
                        case "Intern": 
                            icon = "fa-graduation-cap"; 
                            optionTitle = "School:"; 
                            optionValue = employee.getSchool();                             
                            break;                           
                    }
                    generatedHTML = generatedHTML + `
                    <div class="col-12 col-sm-6 col-lg-4">
                    <div class="card shadow-lg m-2">
                        <div class="card-header text-left">
                            ${employee.name}<br>
                            <i class="fa ${icon}"></i> ${role}
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${role}</h5>
                            <p class="card-text bg-light">
                                <div class="btn-group-vertical">
                                    <button type="button" class="btn infotable">ID: ${employee.id}</button>
                                    <button type="button" class="btn infotable">Email: ${employee.email}</button>
                                    <button type="button" class="btn infotable">${optionTitle} ${optionValue}</button>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
                    `; 
                }
            generatedHTML = generatedHTML + `
            </div>
    </div>

</body>
</html>
            `; 
            const writeFileAsync = util.promisify(fs.writeFile);

            writeFileAsync("team.html", generatedHTML).then(function() {
                console.log("Successfully wrote team.html file");
              });


            
            }
}
                


