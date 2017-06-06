# vue源码简单学习   第一天
### 本人能力有限，尽自己最大努力去看
#### 第一天 
##### &nbsp; &nbsp;vue文档非常的详细，参考vue Api书写业务代码只是板砖而已对自己没多大提高，想要提高自己就要学习好js，通过学习源码来提升自己的js能力。<br/>&nbsp;&nbsp;第二点我发现前端框架层出不穷，目前主流的框架有angular，react，vue等等，但是大体殊途同归，随意迫切希望利用学习vue源码来追根溯源，理解一下底层如何实现的。
##### &nbsp;&nbsp; 通过我的了解现对vue2.0 的新特性做一些简单的介绍
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































