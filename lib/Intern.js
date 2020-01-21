const Employee require("../lib/Employee");

class Intern extends Employee {
    constructor (name, id, title, school) {
        this.role = 'Intern'; 
        this.school = school;  
        super(name, id, title); 
    }

    getRole() { 
        return 'Intern'; 
    }

    getSchool() { 
        return this.school;  
    }
}

module.exports = Intern; 