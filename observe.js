
// ===In observe model ,the most import thing is recursion function ==

//the entrance function of observation function
export function observe(value,vm){   // example:value=>{a:1,b:{c:1,d:1}}

	if (!value || typeof value !=='object') {
		return
	}
	return new Observe(value) // if this is an object ,instantiate the class
}


export default class Observe{

	//use constructor to auto run
	constructor(value){
		this.value=value     // value=>{a:1,b:{c:1,d:1}}
		this.walk(value)
	}

	walk(value){
		object.keys(value).forEach((key) => {    // value=>{a:1,b:{c:1,d:1}}
		  // set every key ==>value have  set/get
		  this.corvert(key,value[key])
		})
	}

	corvert(key,val){  //run two times===>first time(a,1)  second time(b,{c:1,d:1})

		//call defineReactive to set/get
		defineReactive(this.value,key,val) // give this object define get/set
	}
}

export function defineReactive(obj,key,val){  // 1.obj a 1
	var childObj = observe(val)   // 1. recursion => return

	Object.defineProperty(obj,key,{
		enumerable:true,
		configurable:true,
		get:()=>val,
		set:newVal=>{
			childObj = observe(newVal)
			//if(this set a:1===>{} ){use recursion to props  add  get/set}
		}
	})
}

