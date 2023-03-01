class Person {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

}

const person: Person = new Person('xiao wang');

console.log(person.getName());
