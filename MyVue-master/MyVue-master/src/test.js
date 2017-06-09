/**
 * Created by Administrator on 2017/6/8 0008.
 */
var Dep = function () {
    this.subs = {};
}

Dep.target=1;

var dep= new Dep()

console.log(Dep.target)