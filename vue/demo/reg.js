/**
 * Created by Administrator on 2017/6/10 0010.
 */
var reg = /(\w)(\w)/;
var str='blueidea';
reg.exec(str);//返回bl,b,l
console.log(reg.exec(str))

reg = /(\w)\1/;
str='blueidea';
reg.exec(str);//null
console.log(reg.exec(str))

reg = /(\w)\1/;
str='bbs.blueidea.com';
reg.exec(str);//bb, b
console.log(reg.exec(str))

reg = /^(b|c).+/;
str='bbs.blueidea.com';// bbs.blueidea.com b
reg.exec(str);
console.log(reg.exec(str))

 reg =  /(\w)(\w)(.+)/;
  str='bbs.bblueidea.com';
console.log(reg.exec(str))

