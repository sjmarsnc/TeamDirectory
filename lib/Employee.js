class Employee {
    constructor(name, id, email) {
        if (name !== null && name !== '') this.name = name;
        if (id !== null && id !== undefined) this.id = id;
        if (email !== null && email !== undefined) this.email = email;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return 'Employee';
    }

    setName( name) {
        this.name = name;
    }

    setId( id) {
        this.id = id;
    }

    setEmail( email) {
        this.email = email;
    }
    setTitle( title) {
        this.title = title;
    }
}

module.exports = Employee;

