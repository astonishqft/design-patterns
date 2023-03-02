abstract class Duck {

  flyBehavior: FlyBehavior;
  quackBehavior: QuackBehavior;

  constructor(flyBehavior: FlyBehavior, quackBehavior: QuackBehavior) {
    this.flyBehavior = flyBehavior;
    this.quackBehavior = quackBehavior;
  }

  public performFly(): void {
    this.flyBehavior.fly();
  }

  public performQuack():void {
    this.quackBehavior.quack();
  }

  public setFlyBehavior(flyBehavior: FlyBehavior) {
    this.flyBehavior = flyBehavior;
  }
  
  public abstract display(): void;

  public swim() {
    console.log('all ducks can swim !');
  }
}

interface FlyBehavior {
  fly(): void;
}

interface QuackBehavior {
  quack(): void;
}

class FlyWithWings implements FlyBehavior {
  fly(): void {
    console.log('I can fly with my wings !');
  }
}

class FlyNoWay implements FlyBehavior {
  fly(): void {
    console.log('I can not fly !');
  }
}

class FlyRocketPowered implements FlyBehavior {
  fly(): void {
    console.log('I can fly with a rocket !');
  }
}

class Quack implements QuackBehavior {
  quack(): void {
    console.log('gua gua !');
  }
}

class Squeak implements QuackBehavior {
  quack(): void {
    console.log('zhi zhi !');
  }
}

class MuteQuack implements QuackBehavior {
  quack(): void {
    console.log();
  }
}

class MallardDuck extends Duck {
  constructor() {
    super(new FlyWithWings(), new Quack());
  }

  display() {
    console.log('I am mallard duck !');
  }
}

// 模型鸭子
class ModelDuck extends Duck {
  constructor() {
    super(new FlyNoWay(), new MuteQuack());
  }

  public display(): void {
    console.log('I am model duck !');
  }
}

class Test {
  duck: Duck;

  constructor() {
    this.duck = new MallardDuck();
  }

  setPerformFly() {
    this.duck.setFlyBehavior(new FlyRocketPowered());
  }

  quack() {
    this.duck.performQuack();
  }

  fly() {
    this.duck.performFly();
  }
}

const test = new Test();

test.fly();
test.quack();

test.setPerformFly();

test.fly();
