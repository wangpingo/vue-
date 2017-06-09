/**
 * Created by Administrator on 2017/6/8 0008.
 */
var Dep = function () {
    this.subs = {};
}

Dep.target=1;

var dep= new Dep()



var Watcher = function(a){
    this.exp = a;
    //初始化时，触发添加到监听队列
    this.get();
};
Watcher.prototype={
    get(){
        Dep.target=this
    }
}
new Watcher('11')
console.log(Dep.target)