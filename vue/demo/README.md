## js正则表达式详细解读

ps一下，以前正则表达式总给我一种像金庸武侠小说里面的乾坤大挪移
一样高深莫测，是一门绝技。但是修炼很难。vue compiler Dom很多都
用了js正则表达式用来匹配directive，所以是时候修炼一下了

#### 创建一个正则表达式
1. 第一种方法
```javascript
var reg = /pattren/
```
2. 第二种方法
```javascript
var reg = new  RegExp('pattern');
```
3. 正则表达式exec方法简介
```javascript
reg.exec(str) //str为要执行正则表达式的目标字符串
```
例如:
```javascript
    var reg=/test/;
    var str='testString'
    var result = reg.exec(str)
    console.log(result) // test
```
#### c{n}
n是匹配几个的意思
```javascript
var reg= /c{3}/;

var str="cccString"

reg.exec(str) //ccc
```

*,+,?

*表示0次或者多次，等同于{0,}，即

c* 和 c{0,} 是一个意思。

+表示一次或者多次，等同于{1,}，即
c+ 和 c{1,} 是一个意思。

最后，?表示0次或者1次，等同于{0,1}，即

c? 和 c{0,1} 是一个意思

贪心与非贪心

人都是贪婪的，正则也是如此。我们在例子reg = /c{3,4}/;str='ccccTest';的例子中已经看到了，能匹配四个的时候，正则绝对不会去匹配三个。上面所介绍的所有的正则都是这样，只要在合法的情况下，它们会尽量多去匹配字符，这就叫做贪心模式。

如果我们希望正则尽量少地匹配字符，那么就可以在表示数字的符号后面加上一个?。组成如下的形式：

{n,}?, *?, +?, ??, {m,n}?

#### /^开头,结尾$/ 匹配错误返回null
```javascript
reg = /c$/;
str='cainiao';
reg.exec(str); //返回null  表示正则表达式没能在字符串的结尾找到c这个字符。

reg = /^c/;
str='维生素c';
reg.exec(str); //null 因为字符串‘维生素c’的开头并不是c，所以匹配失败。
```

#### 点’.’
‘.’会匹配字符串中除了换行符\n之外的所有字符，例如
```javascript
reg = /./;
str='cainiao';
reg.exec(str);//c

reg = /.+/;
str='blueidea——经典论...坛  好_。';
reg.exec(str);//“blueidea——经典论坛... 好_。“也就是说所有的字符都被匹配掉了，包括一个空格，一个下滑线，和一个破折号。还有'.'本身也可以匹配

reg = /^./;
str='\ncainiao';
reg.exec(str);; //null
```
#### 二选一，正则表达式中的或，“|“
b|c表示，匹配b或者c。
例如：
```javascript
reg = /b|c/;
str='blueidea';
reg.exec(str);//b

reg = /b|c/;
str='cainiao';
reg.exec(str);//c

reg = /^b|c.+/;
str='cainiao';
ereg.exec(str);//cainiao

reg = /^b|c.+/;
str='bbs.blueidea.com';
reg.exec(str);//b   因为上面正则表达式的意思是，匹配开头的b或者是c.+

reg = /^(b|c).+/;
str='bbs.blueidea.com';
reg.exec(str);//bbs.blueidea.com
```

#### 字符集合[abc]

[abc]表示a或者b或者c中的任意一个字符。例如：
```javascript
reg = /^[abc]/;
str='bbs.blueidea.com';
reg.exec(str);//b
```
我们在字字符集合中使用如下的表示方式:[a-z],[A-Z],[0-9]，分别表示小写字母，大写字母，数字。例如：
```javascript
reg =  /^[a-zA-Z][a-zA-Z0-9_]+/;
str='test';
reg.exec(str);//test
```
#### 反字符集合[^abc]

```javascript
reg = /[^abc]/;
str='blueidea';
reg.exec(str);//l  返回的结果是l，因为它是第一个非abc的字符（即第一个b没有匹配）。

reg = /[^abc]/;
str='cainiao';

reg.exec(str);// i   前两个字符都是[abc]集合中的。
```
由此我们可知：[^0-9]表示非数字，[^a-z]表示非小写字母，一次类推。

####边界与非边界
\b表示的边界的意思，也就是说，只有字符串的开头和结尾才算数。例如/\bc/就表示字符串开始的c或者是结尾的c。看下面的例子：

```javascript
reg = /\bc/;
str='cainiao';
reg.exec(str);// c  匹配到了左边界的c字符

reg = /\bc/;
str='维生素c';
reg.exec(str);//c，不过这次返回的是右侧边界的c。

reg = /\bc/;
str='bcb';
reg.exec(str);//null 因为bcb字符串中的c被夹在中间，既不在左边界也不再右边界。

```

与\b对应\B表示非边界。例如：

```javascript
reg = /\Bc/;
str='bcb';
reg.exec(str);//这次会成功地匹配到bcb中的c，。然而

reg = /\Bc/;
str='cainiao';
reg.exec(str); //则会返回null。因为\B告诉正则，只匹配非边界的c。

```

#### 数字与非数字

\d表示数字的意思，相反，\D表示非数字。例如：
```javascript
reg = /\d/;
str='cainiao8';
reg.exec(str);//返回的匹配结果为8，因为它是第一个数字字符。

reg = /\D/;
str='cainiao8';
reg.exec(str);//c

```
#### 空白

\f匹配换页符，\n匹配换行符，\r匹配回车，\t匹配制表符，\v匹配垂直制表符。

\s匹配单个空格，等同于[\f\n\r\t\v]。例如：

```javascript
reg = /\s.+/;
str='This is a test  String.';
reg.exec(str);//“is a test String.”，正则的意思是匹配第一个空格以及其后的所有非换行字符。
//---同样，\S表示非空格字符。
reg = /\S+/;
str='This is a test  String.';
reg.exec(str);//匹配结果为This，当遇到第一个空格之后，正则就停止匹配了。
```
#### \w表示单词字符，等同于字符集合[a-zA-Z0-9_]。例如：

```javascript
reg = /\w+/;
str='blueidea';
reg.exec(str);//的blueidea字符串，因为所有字符都是单词字符。

reg = /\w+/;
str='.className';
reg.exec(str);//结果显示匹配了字符串中的className，只有第一个“.”——唯一的非单词字符没有匹配。

reg = /\W+/;
str='中文如何？';
reg.exec(str);//null  \W表示非单词字符，等效于[^a-zA-Z0-9_]

reg = /\W+/;
str='中文如何？';
reg.exec(str);// 返回完整的字符串，因为，无论是中文和“？”都算作是非单词字符。
```
#### 反向引用
形式如下：/(子正则表达式)\1/

```javascript
reg = /\w/;
str='blueidea';
reg.exec(str);//返回b。

reg = /(\w)(\w)/;
str='blueidea';
reg.exec(str);//返回bl,b,l  
//bl是整个正则匹配的内容，b是第一个括号里的子正则表达式匹配的内容，l是第二个括号匹配的内容。

reg = /(\w)\1/;
str='blueidea';
reg.exec(str);//null
//这里的“\1”就叫做反向引用，它表示的是第一个括号内的字正则表达式匹配的内容。在上面的例子中，第一个括号里的(\w)匹配了b，因此“\1”就同样表示b了，在余下的字符串里自然找不到b了。

reg = /(\w)\1/;
str='bbs.blueidea.com';
reg.exec(str);//bb, b


```
这个正则则会匹配到bb。
同样，前面有几个子正则表达式我们就可以使用几个反向引用。例如：
```javascript
reg = /(\w)(\w)\2\1/;
str='woow';
reg.exec(str);//"woow", "w", "o"
```
前面我们曾经讨论过一次括号的问题，见下面这个例子：

```javascript
reg = /^(b|c).+/;
str='bbs.blueidea.com';// bbs.blueidea.com b 
reg.exec(str);
```

使用形如(?:pattern)的正则就可以避免保存括号内的匹配结果。例如：

```javascript
reg = /^(?:b|c).+/;
str='bbs.blueidea.com';
reg.exec(str);//bbs.blueidea.com  可以看到返回的结果不再包括那个括号内的字正则表达式多匹配的内容。不返回捕获结果
```
#### 正向预查
形式：(?=pattern)
所谓正向预查，意思就是：要匹配的字符串，后面必须紧跟着pattern！
我们知道正则表达式/cainiao/会匹配cainiao。同样，也会匹配cainiao9中的cainiao。但是我们可能希望，cainiao只能匹配cainiao8中的菜鸟。这时候就可以像下面这样写：/cainiao(?=8)/，看两个实例：
```javascript
reg = /cainiao(?=8)/;
str='cainiao9';
reg.exec(str);//null

reg = /cainiao(?=8)/;
str='cainiao8';
reg.exec(str);//cainiao

```
?!

形式(?!pattern)和?=恰好相反，(就是一个等于一个不等于)要求字符串的后面不能紧跟着某个pattern，还拿上面的例子：

```javascript
reg = /blue(?!idea)/;
str='blueidea';
reg.exec(str);//返回null，因为正则要求，blue的后面不能是idea。

reg = /blue(?!idea)/;
str='bluetooth';
reg.exec(str);//blue
```

首先要搞清楚什么是元字符呢？我们之前用过*,+,?之类的符号，它们在正则表达式中都有一定的特殊含义，类似这些有特殊功能的字符都叫做元字符。例如

```javascript
reg = /c*/;

reg = /c\*/;
str='c*';
reg.exec(str);//c*
```
同理，要匹配其他元字符，只要在前面加上一个“\”就可以了。
正则表达式的修饰符
#### 全局匹配，修饰符g
形式：/pattern/g

例子：
```javascript
reg = /b/g;
```

如果正则表达式没有设置g，那么exec方法不会对正则表达式有任何的影响，如果设置了g，那么exec执行之后会更新正则表达式的lastIndex属性，表示本次匹配后，所匹配字符串的下一个字符的索引，下一次再用这个正则表达式匹配字符串的时候就会从上次的lastIndex属性开始匹配，也就是上面两个例子结果不同的原因了。

#### 不区分大小写，修饰符i

形式：/pattern/i

```javascript

var reg = /b/;
var str = 'BBS';
reg.exec(str);//null

var reg = /b/i;
var str = 'BBS';
reg.exec(str);//B   这个就是i修饰符的作用了。
```
#### 行首行尾，修饰符m
形式：/pattern/m

m修饰符的作用是修改^和$在正则表达式中的作用，让它们分别表示行首和行尾。例如：
```javascript
var reg = /^b/;
var str = 'test\nbbs';
reg.exec(str);//匹配失败，因为字符串的开头没有b字符。但是加上m修饰符之后：

var reg = /^b/m;
var str = 'test\nbbs';
reg.exec(str);//b

```
#### exec方法详解
exec方法的返回值
exec方法返回的其实并不是匹配结果字符串，而是一个对象，简单地修改一下execReg函数，来做一个实验就可以印证这一点：
```javascript
function  regexec(str){
 var result =  reg.exec(str);
 alert(typeof result);
}
var reg = /b/;
var  str='bbs.bblueidea.com';
regexec(str);//object
```
而且是一个类似数组的对象。使用for in可以知道它的属性: index input 0。其中index是表示匹配在原字符串中的索引；而input则是表示输入的字符串；

至于0则是表示只有一个匹配结果，可以用下标0来引用这个匹配结果，这个数量可能改变。我们可以通过返回值的length属性来得知匹配结果的总数量。

#### test方法
test方法仅仅检查是否能够匹配str，并且返回布尔值以表示是否成功。同样建立一个简单的测试函数：


#### match方法
与正则表达式的exec方法类似，该方法同样返回一个类似数组的对象，也有input和index属性。我们定义如下一个函数用来测试：

设置了g修饰符的正则表达式在完成一次成功匹配后不会停止，而是继续找到所有可以匹配到的字符。返回的结果包括了三个b。不过没有提供input和index这些信息。

#### replace方法
它的作用是将str字符串中匹配reg的部分用’’new str”部分代码，值得注意的是原字符串并不会被修改，而是作为返回值被返回。例子：
search方法和split方法

同样，字符串的search方法和split方法中也可以使用正则表达式，形式如下：
