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

console.log(mgrQuestions);  

// var teamName = ''; 
var teamMembers = [];   // team members
var isMore = true;
var i = 0;  

buildTeam();  

function buildTeam() {
    inquirer.prompt(teamNameQuestion)
        .then(answer => {
            teamName = answer.teamName;
            console.log('Please enter the manager of this team first.');

            oneEmployee();   // will recurse until no more employees 

            //  user said no more employees, ready to write the html file 
            writePage();
            
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
                            console.log(teamMembers); 
                            if (answer.more) oneEmployee(); 
                            else return;  
                        });
                        break;
    
                    case "Engineer":
                        inquirer.prompt(engQuestions).then(answer => {
                            let employee = new Engineer(memberName, id, email, answer.github);
                            teamMembers.push(employee);
                            console.log(teamMembers); 
                            if (answer.more) oneEmployee(); 
                            else return;  
                        });
                        break;
    
                    case "Intern":
                        inquirer.prompt(internQuestions).then(answer => {
                            let employee = new Intern(memberName, id, email, answer.school);
                            teamMembers.push(employee);
                            console.log(teamMembers); 
                            if (answer.more) oneEmployee(); 
                            else return;   
                        });
                        break;
                }
    
            });
    
}
                
function writePage() {
    console.log("Team Name: ", teamName);
    console.log(teamMembers);
}


