class Employee { 
      constructor(name, id, title) { 
          if (name !== null && name !== '') this.name = name; 
          if (id !== null && id !== undefined) this.id = id;  
          if (title !== null && title !== undefined) this.title = title; 
      }
    
      getName ( empObj)  {
          return empObj.name; 
      }
   
      getId (empObj) { 
          return empObj.id; 
      }

      getTitle (empObj) { 
        return empObj.title; 
    }

    getRole (empObj) { 
        return 'Employee'; 
    }

    setName ( empObj, name)  {
        empObj.name = name;  
    }
 
    setId (empObj, id) { 
        empObj.id = id; 
    }

    setTitle (empObj, title) { 
      empObj.title = title; 
  }
}

module.exports = Employee; 

 