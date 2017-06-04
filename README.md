# vue源码学习 8-)  第一天
### 计划半个月学习结束，坚持每天提交代码
#### 第一天 
##### &nbsp; &nbsp;在网易实习用的regular框架,regular是一款mvvm的框架，但是文档不够详细，vue文档非常的详细，在公司学习regular代码，参考的是vue Api但是繁重的任务量感觉对自己没多大提高，想要提高自己就要学习好js，通过学习源码来提升自己的js能力。<br/>&nbsp;&nbsp;第二点我发现前端框架层出不穷，目前主流的框架有angular，react，vue等等，但是大体殊途同归，随意迫切希望利用学习vue源码来追根溯源，理解一下底层如何实现的。
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

    <em>也就是遇见<就createElement，遇见｛｝就当是js语法。我个人感觉jsx有点乱，虽然性能好。。。</em>
* _Server Render_ 还对Server Render做了支持，这一点没有在业务中使用，不做评价
