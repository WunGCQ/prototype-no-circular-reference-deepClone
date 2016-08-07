# $deepClone
a $deepClone extending function for Array.prototype/Object/Object.prototype/Date.prototype, which avoids circular references both directly and indirecty.

## usage

```javascript
  var a = {a:1, ref:null}, b = {b:1, a:a, ref:null}, c = {c:1, b: b, a: a, ref: null};
  a.ref = a;
  b.ref = b;
  c.ref = c;
  var _c = c.$deepClone();
  //this will not cause max call~ and the console will show you wich property will cause the circular problem
  /*
  Script snippet #1:123 property ref points to some object which may make circular references.the visited objects will warn under this lineprototypeClone @ Script snippet #1:123prototypeClone @ Script snippet #1:116prototypeClone @ Script snippet #1:116(anonymous function) @ VM3931:5
  Script snippet #1:124 [Object, Object]
  Script snippet #1:123 property ref points to some object which may make circular references.the visited objects will warn under this lineprototypeClone @ Script snippet #1:123prototypeClone @ Script snippet #1:116(anonymous function) @ VM3931:5
  Script snippet #1:124 [Object, Object]
  Script snippet #1:123 property a points to some object which may make circular references.the visited objects will warn under this lineprototypeClone @ Script snippet #1:123(anonymous function) @ VM3931:5
  Script snippet #1:124 [Object, Object]
  Script snippet #1:123 property b points to some object which may make circular references.the visited objects will warn under this lineprototypeClone @ Script snippet #1:123prototypeClone @ Script snippet #1:116(anonymous function) @ VM3931:5
  Script snippet #1:124 [Object, Object, Object]
  Script snippet #1:123 property a points to some object which may make circular references.the visited objects will warn under this lineprototypeClone @ Script snippet #1:123prototypeClone @ Script snippet #1:116(anonymous function) @ VM3931:5
  Script snippet #1:124 [Object, Object, Object]
  Script snippet #1:123 property ref points to some object which may make circular references.the visited objects will warn under this lineprototypeClone @ Script snippet #1:123prototypeClone @ Script snippet #1:116(anonymous function) @ VM3931:5
  Script snippet #1:124 [Object, Object, Object]
  */
```

for browsers chich can not support Object.definePropertype which means if you set the method directly to Object.prototype, the for ... in statement can not aviod read '$deepClone' property which comes from its prototype, instead, we can use `Object.$deepClone`, the first argument is the object you want to clone

```javascript
  var a = {a:1, ref:null}, b = {b:1, a:a, ref:null}, c = {c:1, b: b, a: a, ref: null};
  a.ref = a;
  b.ref = b;
  c.ref = c;
  var _c = c.$deepClone();
  //this will not cause max call~ and the console will show you wich property will cause the circular problem
  /*
  Script snippet #1:123 property ref points to some object which may make circular references.the visited objects will warn under this lineprototypeClone @ Script snippet #1:123prototypeClone @ Script snippet #1:116prototypeClone @ Script snippet #1:116(anonymous function) @ VM3931:5
  Script snippet #1:124 [Object, Object]
  Script snippet #1:123 property ref points to some object which may make circular references.the visited objects will warn under this lineprototypeClone @ Script snippet #1:123prototypeClone @ Script snippet #1:116(anonymous function) @ VM3931:5
  Script snippet #1:124 [Object, Object]
  Script snippet #1:123 property a points to some object which may make circular references.the visited objects will warn under this lineprototypeClone @ Script snippet #1:123(anonymous function) @ VM3931:5
  Script snippet #1:124 [Object, Object]
  Script snippet #1:123 property b points to some object which may make circular references.the visited objects will warn under this lineprototypeClone @ Script snippet #1:123prototypeClone @ Script snippet #1:116(anonymous function) @ VM3931:5
  Script snippet #1:124 [Object, Object, Object]
  Script snippet #1:123 property a points to some object which may make circular references.the visited objects will warn under this lineprototypeClone @ Script snippet #1:123prototypeClone @ Script snippet #1:116(anonymous function) @ VM3931:5
  Script snippet #1:124 [Object, Object, Object]
  Script snippet #1:123 property ref points to some object which may make circular references.the visited objects will warn under this lineprototypeClone @ Script snippet #1:123prototypeClone @ Script snippet #1:116(anonymous function) @ VM3931:5
  Script snippet #1:124 [Object, Object, Object]
  */
```

enjoy your self using truely clean functions~

