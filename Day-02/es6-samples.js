class Employee{
    constructor(id, name){
       this.__id__ = id;
       this.name = name;
    }
    display(){
       console.log(`id = ${this.id}, name = ${this.name}`);
    }
    get id(){
       console.info('id getter fired');
       return this.__id__;
    }
    set id(value){
       console.info('id setter fired');
       if (value < 0) return;
       this.__id__ = value;
    }
    static isEmployee(obj){
       return obj instanceof Employee
    }
}

class FulltimeEmployee extends Employee{
    constructor(id, name, salary){
        super(id,name);
        this.salary = salary;
    }
}
let add = (x,y) => x + y

