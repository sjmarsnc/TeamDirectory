const Employee require("../lib/Employee");

class Manager extends Employee {

        constructor (name, id, title, officeNumber) {
        this.reports = [];    // array of objects of those who report to this manager 
        super(name, id, title); 
    }

    getRole { 
        return 'Manager';  
    }
}

module.exports = Manager; 

