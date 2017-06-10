# vue源码简单学习   第一天
### 本人能力有限，尽自己最大努力去看
#### 第一天 
##### &nbsp; &nbsp;vue文档非常的详细，参考vue Api书写业务代码只是板砖而已对自己没多大提高，想要提高自己就要学习好js，通过学习源码来提升自己的js能力。<br/>&nbsp;&nbsp;第二点我发现前端框架层出不穷，目前主流的框架有angular，react，vue等等，但是大体殊途同归，随意迫切希望利用学习vue源码来追根溯源，理解一下底层如何实现的。
##### &nbsp;&nbsp; 通过我的了解现对 vue2.0 的新特性做一些简单的介绍
* _大小&&性能_ vue2.0的线上压缩包gzip后只有12k，而1.0需要22kb，react需要44kb。而且，vue2.0的性能在目前主流框架里面是最快的
* _VDOM_。实现Virtual DOM，并将静态子树进行提取，减少页面重绘对比，与1.0对比性能有明显提升
0. _virtual Dom 关键字解释_：virtual Dom 作为React的核心技术之一，一直有着神秘的面纱  
1.Javascript DOM模型树（VTree），类似文档节点树（DOM）
2. DOM模型树转节点树方法（VTree -> DOM）
3.两个DOM模型树的差异算法（diff(VTree, VTree) -> PatchObject）
4. 根据差异操作节点方法（patch(DOMNode, PatchObject) -> DOMNode）
5. 补充：通俗一点说，先说文档，dom树，渲染树。文档就是一堆html标签，在没被浏览器类似于我们所说的txt文档，
    dom树就是浏览器这玩意解析文档，我感觉就类似我们后端用的模版，把变成一个树状，html是树根，一层层扫变成一个树一样的东西，这就是浏览器分析文档后的结果，
    浏览器一边解析成dom树的时候，还得像当个园艺一样这个树一边生长，一边修剪控制这个dom树以一个园艺工人希望看到的样子生长。一些img标签不能及时渲染的就像一些受伤的树干
    不去管它，不影响自己主干发育，等园艺工人发现了才去修理，重新渲染，这个过程是循环的。在这个过程中会发生重绘和重排。重绘就是你这树由于自然因素枝干有问题，园艺过来修改，
    然后像树枝这么大的东西修建之后肯定影响整体树的样貌，园艺还要相继修改其他的树枝。重绘就是对树叶啊边边脚脚修一修，当然员工更愿意修边脚，修树枝什么太累了。所以重排肯定
    重绘，但是重绘不一定影响重排，砍树枝肯定叶子会掉，但是叶子掉树枝不一定掉。园艺在进行修剪同时也会有自己的方法，就类似于我们所说的重绘和重排
6. 通俗解释 vimtual DOM   说白了就是浏览器解析DOM没有js快，用js模拟DOM比浏览器快，下面我们实战来模拟1：
    
    ```javascript
       //Vue中的 Dom 树（VTree） 模拟
           Let domNode={
               tag:'ul',
               attributes: {id: 'myid'} //唯一
               children: {
                // li .... 
            }
        }
       // 更新到原始dom，比getElementById开销更低
           sync(orignDomNode, domNode);
           //异步分批次插入
       
    ```
    <em>除了提升性能还能做什么</em>
    
    ```javascript
         //  在虚拟Dom中render方法（）直接创建新的节点
           new Vue({
            el:'#app',
            data() {
             return{
              message:'我是一个div'
              //....
          }},
            render() {
               var node =this.$createElement
               return node{
                'div',
                { attrs: {id: 'myid'}},
                this.message   
                //.....
            }
         }   
         
        })    
    ```
    <em>输出:</em>
    
    ```html
       <div id="app">
           <div id="myid">我是一个div</div>
       </div>
    ```
    <em>好处在哪里发现没老铁，那就是你在哪里，我(javascript)无处不在。更有利于工厂作业</em>
* _template & jsx_。众所周知，vue1.0使用的是template来实现模版，react使用jsx实现模版。关于tempalte 和jsx 的争论有很多，很多人不使用就是因为没有支持template语法。vue 2.0 对jsx写法和template写法都做支持，使用时根据具体业务进行进行选择，可以很好发挥两者优势，就这一点vue已经超过react了
    
```html
      //既然都吐槽了，我还是为template语法投上一票把。
      //此处附上一句 jsx 语法
          var person =<Person name={window.isLoginedIn ? window.name : ''}></person>;
      //经过jsx编译后 
          var person = Vue.CreateElement(
              Person,
              window.isLoginedIn ? window.name : ''
      )
```
也就是遇见<就createElement，遇见｛｝就当是js语法。我个人感觉jsx有点乱，我不太喜欢
* _Server Render_ 还对Server Render做了支持，这一点没有在业务中使用，不做评价

### 第二天 什么也不做就弄懂生命周期

#### 首先我们看一下vue的生命周期 
![Alt vue的生命周期](https://sfault-image.b0.upaiyun.com/301/696/3016967164-580822a19b29a_articlex) 

#### 我刚一看到这个图，说实话是有点蒙逼的。但是这个图非常的重要
&nbsp;&nbsp;眨一眼看上这不就是大学期间老师一弄总让画的流程图，既然是流程图就得从头讲起<br>
什么是生命周期：<br>
&nbsp;&nbsp;vue实例有一个完整的生命周期，也就是从开始创建，初始化数据，初始化数据，编译模板，挂载dom，渲染
更新-渲染,通俗的说就是vue实例从创建到销毁的过程，就是生命周期<br>
&nbsp;&nbsp;在vue整个生命周期中，它提供了一系列的事件，可以让我们在事件触发时注册js方法，让我们自己注册的js方法控制整个大局，这些方法的this直接指向vue实例,<br>
1. new vue() 创建vue对象
2. beforeCreate() ----创建vue实例前的钩子函数
3. observe Data   ----开始监听data数据的变化
4. Init events    ----初始化vue内部事件
5. created()      ----实例创建完成之后的钩子函数
6. 编译模板，把data对象里面的数据和vue语法写的模板编译成html
7. 编译好的html替换掉el属性，所指向的dom对象替换对应html标签里面的内容
8. beforeMount()  ----挂载开始前调用，相关的render函数首次被调用
9. mounted() ----- 将编译好的html挂载到页面完成后执行的钩子函数，此时可以进行发送ajax请求获取数据的操作，进行数据初始化。注意：mounted()在整个实例生命内只执行一次
10. beforeUpdated() -----数据更新时调用，发生在虚拟DOM重新渲染和打补丁之前。
11.update() -----数据修改，重新渲染DOM之后调用改钩子。当钩子被调用时，DOM结构已经被更新，所以在钩子中可以执行依赖的DOM操作。
12. beforeDestory() ----- 实例销毁前调用的钩子函数
13. destoryed() ----- Vue实例销毁后，调用。

### 开始 剖(pou) 析
&nbsp;&nbsp;  首先啥是钩子，钩子干啥的。---> 那个你们钓过鱼没有，钓鱼用的就是钩子，鱼在水里游怎么才能捕获到它，要用鱼钩。vue里面钩子就是，vue有自己的运行机制，你要想捕获他运行时的状态只有通过他提供给你的钩子。<br>
&nbsp;&nbsp;  流程图吗哪里最难懂，肯定是分叉的时候....
1. has 'el' option 这里分叉了，这个叉小所以好懂。<br>&nbsp;&nbsp; &nbsp;&nbsp; 就是说有没有dom节点，没有dom节点 我就不能编译模板
2. has 'template' option 我有dom了，开始编译模板，有'template'我就编译innerHtml，没有我就编译 outerHtml。 
```html
// ps 补充一下哈
<div id="app">
    <div id="child"></div>
</div>
var app = document.getElementById('app');
app.innerHtml=  <div id="child"></div>
app.outerHtml=<div id="app"><div id="child"></div></div>
```
3. Mounted 这里有个循环  这个简单，监听数据变化，一变化他就更新dom，更新完就渲染，然后再监听....就这样 <br> <strong>mounted钩子就执行一次</strong>

#### 最近有点浮躁啊，生活总是那么的调皮。没办法，我去面壁去了....

### 第三天
&nbsp;&nbsp; 从github上下载了vue源码。我感觉vue代码优雅精辟，作者可能不屑提起这些东西，那么就让我来吧 :)
#### 程序结构梳理

vue.js 是一个非常典型的MVVM的程序结构，整个程序的上层大概分为
1. 全局设计：包括全局接口，默认选项等
2. vm实例设计: 包括接口设计(vm原型),实力初始化过程设计(vm构造函数)
3. 这里大部分内容可以直接跟Vue.js的官方api[This link](http://vuejs.org/api/) has no title attribute.
    <div>
        整个实例化过程中，重中之重就是把数据(Model)和视图(View)建立起来关联关系。Vuejs 和诸多MVVM的思路类似，主要做了三件事：
        <oL>
            <li>通过observe对data进行监听，并且提供订阅某个数据项变化的能力</li>
            <li>把template解析成一段document fragment(接口表示文档一部分或一段，他表示一个或多个临接的Document节点和他们所有的子孙节点。document fragment不属于文档树，继承的parentNode属性总是null),得到每一个directive所依赖的数据项和更新方法,比如v-text='message'依赖数据项this.$data.message,以及所依赖的视图更新方法node.textContent = this.$data.message。
            </li>
            <li>
               通过watcher把上述两部分结合起来，即把directive中的数据依赖项订阅在对应的数据的observer上，这样当数据变化的时候，就会触发observe，进而触发对应的视图更新方法，最后达到模板关联的效果              
            </li>
        </ol
    </div>
4.vm 整个核心就是如何实现observe，directive，watcher这三样东西
    ps（s首先介绍一下vue源码的目录结构）我们需要关心的是src下面的，test下面的是测试用例想看也可以看一下
       1. compiler  模板编译部分
       2. core 核心实现部分
       3. platforms/web   web渲染部分
       4. server  服务器渲染
       5. shared/utils  基础工具
      我们首先讲解一下defineProperty，vue就是通过它实现双向数据绑定。
      ```
      //几行代码看他怎么用
      var a={}
      Object.defineProperty(a,"b",{
         value:123
      })
      code
      ```
      <em> 很简单接受三个参数，每一个都是必填项</em>
      我们来解释一下传入的三个参数
      1. 第一个参数：目标对象
      2. 需要定义的属性或方法名字
      3. 目标属性所拥有的特性 （descriptor）
##### 我们主要介绍第三个参数很重要descriptor
它有以下取值，我们先简单介绍一下，后面的例子我们在挨个介绍。

1. value：属性的值。。。
2. writable：如果为fasle，属性的值不能背写，只能为只读
3. configable：总开关，一旦为fasle，不能设置其他属性的值
4. enumerbale：枚举；是否能在intorater接口边遍历
5. get 一会慢慢品
6. set 一会慢慢品

##### descripter 默认值
我们再看看第一个例子
``` javascript

var a= {}
Object.defineProperty(a,"b",{
 value:123
})
console.log(a.b);//123
```

我们虽然只设置了value，别的值没设置，但是第一次可以理解为系统会帮我们自动设置上几个默认值等价于下面
```javascript
  var a={}
  Object.defineProperty(a,'b',{
    value:123,
    enumerable:false,
    configurable:false,
    writable:false
    })
    console.log(a.b)
    a.b=3;
    console.log(a.b) //a.b=123
```

这个configurable 是总开关一旦设置上，第二次设置一点用没有
writable设置为fasle 为只读
enumerable定义对象的属性是否可以被枚举

在descriptor中不能设置访问器(get和set)和writable或value，否则会报错，就是说想用get和set，就不能用writable或value中的任何一个。<br>
set和get是干啥用的。


```javascript
    var a={}
    Object.defineProperty(a,'b',{
        set:function(newValue){
          console.log("你要赋值给我的新值"+newValue)
        },
        get:function(){
          console.log("你要取我的值")
          return 2; //我也可以硬性的设置
        }
      })
```
下面根据vue简单实现一个$watch，就是利用set和get。我们将要observe的对象，通过递归将他所有的属性，包括子属性的属性，都给加上set，get。这样的话，给这个对象的某个属性值赋值，就会触发set。

```javascript
//详情代码请看 observe.js
    export default class Observe{
      constructor(value){
        this.value=value;
        this.walk(value)
      },
      walk(value){
        Object.keys(value).forEach(key=>this.covert(key,value[key]))
      },
      convert(key,val){
        defineReactive(this.value,key,val)
      } 

    }

    export function defineReactive (obj,key,val){
      var childOb = observe(val)
      Object.defineProperty(obj,key,{
         enumerable: true,
         configurable: true,
         get: ()=>val,
         set:newVal=> { 
              childOb = observe(newVal)//如果新赋值的值是个复杂类型。再递归它，加上set/get。。
         }

        })
    }
    
  export function observe (value, vm) {
   if (!value || typeof value !== 'object') {
   return
   }
   return new Observer(value)
  }


    
```
#### 第四天

首先回顾一下第三天的内容，有的读者对于export和export defalut不太清楚
es6中，export和export default均可以导出常量函数，文件，和模块，你可以
在其他文件中或模块中通过import（常量|函数文件|模块）名的方式导入，在一个文
件中export可以有多个，export default确只有一个
```javascript
    //导出方式是这个
    export const str='hello world'
    export function f(a) {
      return a+1
    }
    //导入方式
    import {str,f} from 'demo1'  //导入的时候带花括号
```
```javascript
    export default const str='hello world'
    
    import  str from 'demo2'  // 导入不带花括号...
```

第三天写的代码主要是observe，其主要功能就是给一个属性添加get/set函数
这样的话，这个对象的任意一个属性赋值都会触发set函数.但是仅仅通过这个是
不能实现watch的监听的。我们应该写一个消息-订阅器。一触发set方法，就发出
一个通知，然后订阅这个消息。
why? 什么叫消息-订阅器  订阅明白吗？订阅就是我到一家卖报纸的地方告诉老板，
“老板你加我微信，你家有新报纸的话第一时间通知我，我决定要不要买”

很简单,我们维护一个数组,这个数组，就放订阅着，一旦触发notify，订阅者就调用
自己的方法
```javascript
    export default class Dep{
        constructor(){
            this.subs=[]
        }
        addSub(sub){
            this.subs.push(sub)
        }
        notify(){
            this.subs.forEach(sub=>sub.update())
        }
    }
```
所以每次set函数的时候，我们应该触发notify。
```javascript
    export function defineReactive(obj,key,val) {
      var dep=new Dep()
      var childOb = observer(val)
      Object.defineProperty(obj,key,{
          enumerable:true,
          configurable:true,
          get: () =>val,
          set:newVal=>{
              var value=val
              if(newVal===value){
                  return
              }
              childOb = observer(newVal)
              dep.notify()
          }
      })
    }
```
那么问题来了。谁是订阅者。对，是Watcher。一旦 dep.notify()就遍历订阅者，
也就是Watcher，并调用他的update()方法

#### 实现一个Watcher
我们想象这个Watcher，应该用什么东西。update方法，嗯这个毋庸置疑，还有呢。
```javascript
export default class Watcher {
 constructor(vm, expOrFn, cb) {
 this.cb = cb
 this.vm = vm
 //此处简化.要区分fuction还是expression,只考虑最简单的expression
 this.expOrFn = expOrFn
 this.value = this.get()
 }
 update(){
 this.run()
 }
 run(){
 const value = this.get()
 if(value !==this.value){
 this.value = value
 this.cb.call(this.vm)
 }
 }
 get(){
 //此处简化。。要区分fuction还是expression
 const value = this.vm._data[this.expOrFn]
 return value
 }
}

```
那么问题来了，我们怎样将通过addSub(),将Watcher加进去呢。
 我们发现var dep = new Dep() 处于闭包当中，我们又发现Watcher的构造函数里会调用this.get，所以，我们可以在上面动动手脚，修改一下Object.defineProperty的get要调用的函数，判断是不是Watcher的构造函数调用，如果是，说明他就是这个属性的订阅者，果断将他addSub()中去，那问题来了？
 我怎样判断他是Watcher的this.get调用的，而不是我们普通调用的呢。
 ```javascript
export default class Watcher {
 ....省略未改动代码....
 get(){
 Dep.target = this
 //此处简化。。要区分fuction还是expression
 const value = this.vm._data[this.expOrFn]
 Dep.target = null
 return value
 }
}

```
#### 第五天

##### 今天讲watcher的实现，但是我在看后续的compiler遇到了一个问题
为什么用Object.prototype.toString.call(obj)检测对象类型?
这是一个十分常见的问题，用 typeof 是否能准确判断一个对象变量，
答案是否定的，null 的结果也是 object，Array 的结果也是 object，
有时候我们需要的是 "纯粹" 的 object 对象。如何避免呢？比较好的方式是：
```javascript

//调用的是obj自己的方法

console.log(Object.prototype.toString.call(obj) === "[object Array]");

//调用的是对象的原型方法,vue用的是这个思想

console.log(Object.prototype.toString(obj) === "[object Object]");
```
#### 第六天 

<h4>这里补充一下，使用slice和concat对数组实现浅拷贝和深拷贝</h4>
因为以后的compiler更新Dom 都是通过数组拷贝一个nodes节点进行
实现数组的浅拷贝和深拷贝
##### 数组深拷贝方法
对于array对象的slice函数，返回一个数组的一段。（仍为数组）
arrayObj.slice(start, [end])

参数：
arrayObj 必选项。一个 Array 对象。
start 必选项。arrayObj 中所指定的部分的开始元素是从零开始计算的下标。
end可选项。arrayObj 中所指定的部分的结束元素是从零开始计算的下标。
```javascript
var arr1 = ["1","2","3"];
var arr2 = arr1.slice(0);
arr2[1] = "9";
console.log("数组的原始值：" + arr1 );
console.log("数组的新值：" + arr2 );
```
##### js的concat方法

```javascript
var arr1 = ["1","2","3"];
var arr2 = arr1.concat();
arr2[1] = "9";
console.log("数组的原始值：" + arr1 );
console.log("数组的新值：" + arr2 );
```
<h4>局限性</h4>
使用slice和concat对对象数组的拷贝，整个拷贝还是浅拷贝，拷贝之后数组各个值的指针还是指向相同的存储地址。

<h4>这里补充一下import和require的区别</h4>
写个简单的文件，假设名字是lib.js。假设内容如下
```javascript
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
```
这样在其他方式上有两种引用方法，也就是import和require
```javascript
import {squire,diag} from 'lib'
console.log(square(11)); // 121
console.log(diag(4, 3));

import * as lib from 'lib';
square = lib.square;
```
还可以设置默认的导出信息，就需要崽lib.js中定义 
export default {}。default后面可以接一个参数，也可以接一个数组。书写方法为：

通常比较习惯用第一种。然后用import就可以得到这个数组或则参数。但是import只能
用于静态导入，就是必须在文件开始的时候，在最上层就写好。而require就可以实现动态加载。

import是静态引入在文件最开始的地方，require是动态加载

运行时加载  非语言层面标准，运行时确立静态关系
编译时加载  语言层面标准，支持编译时静态分析
#### 看到这里 X的 无比的烦，突然发现export和module.exports也是不太明白的

我非常熟悉nodejs模块中的exports对象
```javascript
//aa.js
export function aa() {
  ....
}
//把aa方法暴露出去
// 另一个文件引入
var aa=require('./a.js')
aa.aa()  //故意迷惑你哈哈
```
上面就是我们经常用的exports,但是node里面甚少用module.exports，
因为exports是module.exports的老弟，exports引用的module.exports
所以他才是老大，你要把module.exports这个老大重新赋值了，那么它的小弟
肯定找不到....

#### 第七天

学到今天我才知道什么是真正的vue。我感觉自己已经领会到vue的概念。哈哈！！
就像张三丰和张无忌对话
1. 张三丰说"无忌你记住了吗"
2. 张无忌说“我记住了师公”
3. 张三丰说“那我再打一遍”
4. 张三丰又问记住多少，张无忌回答“忘完了”
====== 这就是太极拳 -_-！！ =======
所以啊今天我搞到这里我终于理解到了vue，但是我已经忘记了vue，学会了mvvm思想嘻嘻

##### 此谓“vue”
1. vue 利用Object.defineProperty,将要观察的对象，转化成getter/setter,以便我们
    拦截对象的赋值与取值操作，称之为Observe
2. 将Dom解析，提取其中的指令与占位符，并赋予不同的操作，称之为compiler
3. 需要将dom解析的结果，与Observe所观察的对象连接起来建立关系，在Observe接收到数据变化时，
   接受通知，同时更新Dom 此为vue  
4. 最后需要一个公共的入口对象，接受配置，协调上述三者，称之为vue

##### 补充一下js正则表达式

这部分内容较多请在demo文件目录下，观看README.md







