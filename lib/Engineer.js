const Employee require("../lib/Employee");

class Engineer extends Employee {
    constructor (name, id, title, githubUser) {
        this.githubUser = githubUser; 
        super(name, id, title); 
    }

    getGitHub () { 
        return this.githubUser;  
    }

    getRole() { 
        return 'Engineer'; 
    }
}

module.exports = Intern; 