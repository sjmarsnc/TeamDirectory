const inquirer = require("inquirer");
const util = require("util");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

// questions for all employees 
const employeeQuestions = [
    {
        type: "input",
        name: "memberName",
        message: "Please enter the employee's name:"
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
const mgrQuestion = [
    {
        type: "input",
        name: "office",
        message: "Where is this member's office?"
    }];

// question only for engineers
const engQuestion = [
    {
        type: "input",
        name: "github",
        message: "What is this member's github username?"
    }];

// question only for interns
const internQuestion = [
    {
        type: "input",
        name: "school",
        message: "What is this member's school"
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

// var teamName = ''; 
var teamMembers = [];   // team members
var isMore = true;


// buildTeam();  

async function buildTeam() {
    var i = 0;
    inquirer.prompt(teamNameQuestion)
        .then(answer => {
            teamName = answer.teamName;
            console.log('Please enter the manager of this team first.');

            while (isMore) {
                inquirer.prompt(employeeQuestions)
                    .then(answers => {
                        i++;
                        if (i > 3) return;   // trying to stop infinite loop 
                        const { memberName, role, id, email } = answers;
                        switch (role) {
                            case "Manager":
                                inquirer.prompt(mgrQuestion).then(answer => {
                                    let employee = new Manager(memberName, id, email, answer.office);
                                    teamMembers.push(employee);
                                })
                                break;

                            case "Engineer":
                                inquirer.prompt(engQuestion).then(answer => {
                                    let employee = new Engineer(memberName, id, email, answer.github);
                                    teamMembers.push(employee);
                                })
                                break;

                            case "Intern":
                                inquirer.prompt(engQuestion).then(answer => {
                                    let employee = new Intern(memberName, id, email, answer.school);
                                    teamMembers.push(employee);
                                })
                                break;
                        }
                        // teamMembers.push(employee); 
                        inquirer.prompt(moreEmployees).then(answer => {
                            isMore = answer.more;
                        });

                    });
            }
            //  user said no more employees, ready to write the html file 
            writePage();

        });

}

function writePage() {
    console.log("Team Name: ", teamName);
    console.log(teamMembers);
}


