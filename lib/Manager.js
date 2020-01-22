const Employee = require("../lib/Employee");

class Manager extends Employee {

        constructor (name, id, email, officeNumber) {
            super(name, id, email); 
            this.reports = [];    // array of objects of those who report to this manager 
            this.officeNumber = officeNumber;  
    }

    getRole()  { 
        return 'Manager';  
    }

    getOfficeNumber() { 
        return this.officeNumber; 
    }
}

module.exports = Manager; 

