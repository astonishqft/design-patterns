## 前言

驱使我写这篇文章的目的其实很简单，就是因为最近在看的一本书<<HeadFirst设计模式>>中的一句话，说的非常好：

> 知道抽象、继承、多态这些概念，并不会马上让你变成好的面向对象设计者。设计大师关心的是建立弹性的设计，可以维护，可以应付改变。

是的，很多时候我们会觉得自己已经清楚的掌握了面向对象的基本概念，封装、继承、多态都能熟练使用，但是系统一旦复杂了，却无法设计一个可维护、弹性的系统，事实上设计模式就是帮我们总结一些已有的成熟的设计模式，来帮大家更好的运用面向对象的设计思想。

## 策略模式

TODO:
简介，需要补充说明

## 模拟鸭子游戏

### 设计模拟鸭子游戏

一个游戏公司开发了一款模拟鸭子的游戏，所有的鸭子都会呱呱叫(quack)、游泳(swim) 和 显示(dislay) 方法。

基于面向对象的设计思想，想到的是设计一个Duck基类，然后让所有的鸭子都集成此基类。

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

绿头鸭(MallardDuck)和红头鸭(RedheadDuck)分别继承Duck类：

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

设计者立马想到的是给 Duck 类添加 fly 方法，这样所有的鸭子都具备了飞行的能力。

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

于是，设计者立马想到了覆写 RubberDuck 类的duck和fly方法，其中fly方法里面什么也不做。

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

设计者仔细思考了上述设计，提出了一个问题：如果后续新增了更多类型的鸭子，有的鸭子既不会飞又不会叫怎么办呢？难道还是继续覆写fly或者quack方法吗？

显然，集成不是最优解。

经过一番思索，设计者想到了通过接口来优化设计。

设计两个接口，分别是 Flable 和 Quackable 接口。

```typescript
interface Flyable {
  fly(): void;
}

interface Quackable {
  quack(): void;
}
```

这样，只有实现了 Flyable 的鸭子才能飞行，实现了 Quackable 的鸭子才能说话。

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

在Duck类中，quack 和 fly 是会随着鸭子的不同而改变的，而 swim 和 display 是每个鸭子都不变的。因此，这里可以运用第一个设计原则，就是分开变化和不变化的部分。

### 面向接口编程，而不是针对实现编程

为了更好的设计我们的代码，现在介绍第二个设计原则：

> 针对接口编程，而不是针对实现编程。

