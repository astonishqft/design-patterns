## 前言

作为一名合格的前端开发工程师，全面的掌握面向对象的设计思想非常重要，而“设计模式”是众多软件开发人员经过相当长的一段时间的试验和错误总结出来的，代表了面向对象设计思想的最佳实践。正如《HeadFirst设计模式》中说的一句话，非常好：

> 知道抽象、继承、多态这些概念，并不会马上让你变成好的面向对象设计者。设计大师关心的是建立弹性的设计，可以维护，可以应付改变。

是的，很多时候我们会觉得自己已经清楚的掌握了面向对象的基本概念，封装、继承、多态都能熟练使用，但是系统一旦复杂了，就无法设计一个可维护、弹性的系统。本文将结合 《HeadFirst设计模式》书中的示例加上自己一丢丢的个人理解，带大家认识下设计模式中的第一个模式——策略模式。

## 策略模式

> 策略模式：Strategy，是指，定义一组算法，并把其封装到一个对象中。然后在运行时，可以灵活的使用其中的一个算法

## 模拟鸭子游戏

### 设计模拟鸭子游戏

一个游戏公司开发了一款模拟鸭子的游戏，所有的鸭子都会呱呱叫(quack)、游泳(swim) 和 显示(dislay) 方法。

基于面向对象的设计思想，想到的是设计一个 `Duck` 基类，然后让所有的鸭子都集成此基类。

```typescript
class Duck {
  quack() {

  }
  swim() {

  }
  display() {

  }
}
```

绿头鸭(MallardDuck)和红头鸭(RedheadDuck)分别继承 `Duck` 类：

```typescript
class MallardDuck extends Duck {
  quack() {
    console.log('gua gua');
  }
  display() {
    console.log('I am MallardDuck');
  }
}

class RedheadDuck extends Duck {
  display() {
    console.log('I am ReadheadDuck');
  }
  quack() {
    console.log('gua gua');
  }
}
```

### 让所有的鸭子会飞

现在对所有鸭子提出了新的需求，要求所有鸭子都会飞。

设计者立马想到的是给 `Duck` 类添加 `fly` 方法，这样所有的鸭子都具备了飞行的能力。

```typescript
class Duck {
  quack() {

  }
  fly() {
    
  }
  swim() {

  }
  display() {

  }
}
```

但是这个时候代码经过测试发现了一个问题，系统中新加的橡皮鸭(RubberDuck)也具备了飞行的能力了。这显然是不科学的，橡皮鸭不会飞，而且也不会叫，只会发出“吱吱”声。

于是，设计者立马想到了覆写 `RubberDuck` 类的 `duck` 和 `fly` 方法，其中 `fly` 方法里面什么也不做。

```typescript
class RubberDuck extends Duck {
  quack() {
    console.log('zhi zhi');
  }
  fly() {

  }
}
```

### 继承可能并不是最优解

设计者仔细思考了上述设计，提出了一个问题：如果后续新增了更多类型的鸭子，有的鸭子既不会飞又不会叫怎么办呢？难道还是继续覆写 `fly` 或者 `quack` 方法吗？

显然，集成不是最优解。

经过一番思索，设计者想到了通过接口来优化设计。

设计两个接口，分别是 `Flable` 和 `Quackable` 接口。

```typescript
interface Flyable {
  fly(): void;
}

interface Quackable {
  quack(): void;
}
```

这样，只有实现了 `Flyable` 的鸭子才能飞行，实现了 `Quackable` 的鸭子才能说话。

```typescript
class MallardDuck implements Flayable, Quackable {
  fly() {

  }
  quack() {

  }
}
```

通过接口虽然可以限制鸭子的行为，但是每个鸭子都要检查一下是否需要实现对应的接口，鸭子类型多起来之后是非常容易出错的，同时，通过接口的方式虽然限制了鸭子的行为，但是代码量却没有减少，每个鸭子内部都要重复实现fly和quack的代码逻辑。

### 分开变化和不变化的部分

下面开始介绍我们的第一个设计原则：

> 找出应用中可能需要变化之处，把它们独立出来，不要和那些不需要变化的代码混在一起。

在 `Duck` 类中，`quack` 和 `fly` 是会随着鸭子的不同而改变的，而 swim 和 display 是每个鸭子都不变的。因此，这里可以运用第一个设计原则，就是分开变化和不变化的部分。

### 面向接口编程，而不是针对实现编程

为了更好的设计我们的代码，现在介绍第二个设计原则：

> 针对接口编程，而不是针对实现编程。

**针对接口编程**的真正含义是**针对超类型编程(抽象类或者接口)**，它利用了**多态**的特性。

在针对接口的编程中，一个变量声明的类型应该是一个超类型，超类型强调的是它与它的所有派生类共有的“特性”。

针对实现编程。

比如：

```typescript
interface Animal {
  void makeSound();
}

class Dog implements Animal {
  public void makeSound() {
    bark();
  }
  
  public void bark() {
    // 汪汪叫
  }
}

Dog d = new Dog();
d.bark();
```

因为 `d` 的类型是 `Dog`，是一个具体的类，而不是抽象类，并且 `bark` 方法是 `Dog` 上特有的，不是共性。

针对接口编程。

```typescript
Animal a = new Dog();
a.makeSound();
```

变量 `a` 的类型是 `Animal`，是一个抽象类型，而不是一个具体类型。此时 `a` 调用 `makeSound` 方法，代表的是所有的 `Animal` 都能进行的一种操作。

现在我们接着之前的思路，将鸭子的 `fly` 和 `quack` 两个行为变为两个接口 `FlyBehavior` 和 `QuackBehavior`。所有的鸭子不直接实现这两个接口，而是有专门的行为类实现这两个接口。

```typescript
interface FlyBehavior {
  fly(): void;
}

interface QuackBehavior {
  quack(): void;
}
```

行为类来实现接口：

```typescript
// 实现了所有可以飞行的鸭子的动作
class FlyWithWings implements FlyBehavior {
  fly(): void {
    console.log('I can fly with my wings !');
  }
}
// 实现了所有不会飞行的鸭子的动作
class FlyNoWay implements FlyBehavior {
  fly(): void {
    console.log('I can not fly !');
  }
}
// 实现了所有坐火箭飞行的鸭子的动作
class FlyRocketPowered implements FlyBehavior {
  fly(): void {
    console.log('I can fly with a rocket !');
  }
}
// 实现了橡皮鸭的吱吱叫声
class Squeak implements QuackBehavior {
  quack(): void {
    console.log('zhi zhi !');
  }
}
// 实现了哑巴鸭的叫声
class MuteQuack implements QuackBehavior {
  quack(): void {
    console.log();
  }
}
```

这样做有**两**个好处：

1. **鸭子的行为可以被复用，因为这些行为已经与鸭子本身无关了。**
2. **我们可以新增一些行为，不会担心影响到既有的行为类，也不会影响有使用到飞行行为的鸭子类。**

### 整合鸭子的行为

现在鸭子的所有的行为需要被整合在一起，需要委托给别人处理。

继续改造 `Duck` 类。

```typescript
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
```
在鸭子类内部定义两个变量，类型分别为 `FlyBehavior` 和 `QuackBehavior` 的接口类型，声明为接口类型方便后续通过多态的方式设置鸭子的行为。移除鸭子类中的 `fly` 和 `quack` 方法，因为这两个方法已经被分离到 `fly` 行为类和 `quack` 行为类中了。

通过 `performQuack` 方法来调用鸭子的行为，`setFlyBehavior` 方法来动态修改鸭子的行为。

所有的鸭子集成 `Duck` 类：

```typescript
// 绿头鸭
class MallardDuck extends Duck {
  constructor() {
    super(new FlyWithWings(), new Quack());
  }

  display() {
    console.log('I am mallard duck !');
  }
}

// 模型鸭
class ModelDuck extends Duck {
  constructor() {
    super(new FlyNoWay(), new MuteQuack());
  }

  public display(): void {
    console.log('I am model duck !');
  }
}
```

在鸭子的构造函数中调用父类的构造函数，初始化鸭子的行为。

### 测试鸭子游戏

```typescript
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
```

通过 `setFlyBehavior` 可以动态的改变鸭子的行为，是鸭子具备坐火箭飞行的能力。

### 多用组合，少用集成

从上面的例子就可以看出，每一个鸭子都有一个 `FlyBehavior` 和 `QuackBehavior`，让鸭子(`Duck` 类)将飞行和呱呱叫委托它代为处理。

当你将两个类结合起来使用，这就是组合(`composition`)。这种做法和继承不同的地方在于，鸭子的行为不是继承而来，而是和使用的行为对象组合而来的。也就是我们要介绍的第三个设计原则：

> 多用组合，少用继承

## 策略模式的设计步骤

1. 定义一个接口，接口中声明各个算法所共有的操作

```typescript
interface Strategy {
  execute(): void;
} 
```

2. 定义一系列的策略，并且在遵循 `Strategy` 接口的基础上实现算法

```typescript
class StrategyA implements Strategy {
  execute() {
    console.log('I am StrategyA'); // 算法 A
  }
}

class StrategyB implements Strategy {
  execute() {
    console.log('I am StrategyB'); // 算法 B
  }
}
```

3. 定义一个上下文 `Context` 类，在 `Context` 类中维护指向某个策略对象的引用，在构造函数中来接收策略类，同时还可以通过 `setStrategy` 在运行时动态的切换策略类，`Context` 类通过 `setStrategy` 来将具体的工作委派给策略对象。这里的 `Context` 类也可以作为一个基类被具体的实现类所继承，就相当于上文鸭子游戏中介绍的 Duck 类，可以被 MallardDuck、ReadheadDuck 等继承。

```typescript
class Context {
  private strategy: Strategy;

  constructor(stategy: Stategy) {
    this.stategy = Stategy;
  }

  executeStrategy() {
    this.stragegy.execute();
  }

  setStrategy(stategy: Stategy) {
    this.stategy = stategy;
  }
}
```

4. 创建客户端类，客户端代码会根据条件来选择具体的策略。

```typescript
class Application {
  stragegy: Stragegy;
  constructor(stragegy: Stragegy) {
    this.stragegy = stragegy;
  }
  setCondition(condition) {
    if (condition === 'conditionA') {
      stragegy.setStrategy(new StrategyA());
    }
    if (condition === 'conditionB') {
      stragegy.setStrategy(new StrategyB());
    }
  }
  execute() {
    this.stragegy.execute();
  }
}

const app = new Application();

app.setCondition('conditionB');
app.execute();
```

策略模式结构图:

<div align=center>
  <img alt="策略模式结构图" src="./structure.png" />
</div>

## 策略模式的使用场景

**当我们在设计代码的时候，想使用对象中各种不同的算法变体，并希望能在运行时切换算法时， 可以考虑使用策略模式。**

## 参考

[源代码地址](https://github.com/astonishqft/design-patterns/tree/main/packages/strategy)

1. [针对接口编程，而不是针对实现编程](https://codeshellme.github.io/2020/12/dp-code-interface/)
2. [策略模式](https://refactoringguru.cn/design-patterns/strategy)
2. 《HeadFirst设计模式》