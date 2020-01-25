const inquirer = require("inquirer");
const util = require("util"); 
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
 
var teamName = ''; 
var team = [];   // team members

buildTeam();  

async function buildTeam() {
    var teamName = await getTeamName();  
    console.log(teamName); 

    var test = await getMemberInfo();  
    console.log(test);  

}

async function getTeamName () { 
    
    let answer = await inquirer.prompt([
      {
        type: "input",
        name: "teamName",
        message: "What is name of your team?"
      }
    ]); 
    const { teamName } = answer; 
    return answer;  
    }


// var director = getDirector(); 

// console.log(team);  


// var test = getMemberInfo(); 

// console.log(`Object returned: ${test}`); 

async function getMemberInfo () {
    // try { 

        inquirer.prompt([
            {
                type: "input",
                name: "memberName", 
                message: "Please enter the team member's name:"
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
            }
        ]).then ( answers => {

            
            const { memberName, role, id, email } = answers; 
            
            switch (answers.role) {
                
                case "Manager": 
                let answerm = inquirer.prompt([
                    {
                        type: "input",
                        name: "office",
                        message: "Where is this member's office?"
                    }
                ]);
                let manager = new Manager(memberName, id, email, answerm.office); 
                return manager;  
                
                
                case "Engineer": 
                let answere = inquirer.prompt([
                    {
                        type: "input",
                        name: "github",
                        message: "What is this member's github username?"
                    }
                ]); 
                let engineer = new Engineer(memberName, id, email, answere.github);   
                return engineer; 
                
                
                case "Intern": 
                let answeri = inquirer.prompt([
                    {
                        type: "input",
                        name: "school",
                        message: "What is this member's school"
                    }
                ]);
                let intern= new Intern(memberName, id, email, answeri.school);   
                return intern; 
                
                //         }
                
                // }   catch (err) {
                    //     console.log(err); 
                    // }
                }
            }); 
        }

  