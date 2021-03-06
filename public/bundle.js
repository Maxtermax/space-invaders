/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 54);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(27)('wks');
var uid = __webpack_require__(17);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var ctx = __webpack_require__(38);
var hide = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(39);
var toPrimitive = __webpack_require__(23);
var dP = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(36);
var defined = __webpack_require__(21);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(15);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(11);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(74);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(42);
var enumBugKeys = __webpack_require__(28);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(13);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextBox = function () {
  function TextBox(ctx, x, y) {
    var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var font = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '12px arial';
    var display = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    (0, _classCallCheck3.default)(this, TextBox);

    this.ctx = ctx;
    this.font = font;
    this.x = x;
    this.y = y;
    this.data = data;
    this.display = display;
  }

  (0, _createClass3.default)(TextBox, [{
    key: 'render',
    value: function render() {
      this.rendered = false;
      var ctx = this.ctx,
          font = this.font,
          x = this.x,
          y = this.y,
          data = this.data,
          display = this.display;

      if (display) {
        ctx.beginPath();
        ctx.save();
        ctx.font = font;
        var measure = ctx.measureText(data);
        var txtHeight = parseFloat(ctx.font) * 2;
        var padding = 5;
        ctx.fillStyle = 'black';
        ctx.fillRect(x + padding, y - (txtHeight - txtHeight / 4 - 1), measure.width + padding, txtHeight);
        ctx.fillStyle = 'white';
        ctx.fillText(data, x + padding, y);
        ctx.restore();
        ctx.closePath();
      }
      this.rendered = true;
    }
  }]);
  return TextBox;
}();

exports.default = TextBox;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(11);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(10);
var dPs = __webpack_require__(62);
var enumBugKeys = __webpack_require__(28);
var IE_PROTO = __webpack_require__(26)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(40)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(66).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(27)('keys');
var uid = __webpack_require__(17);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(6);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(21);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(22);
var wksExt = __webpack_require__(32);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57);
var global = __webpack_require__(1);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(14);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(22);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(41);
var hide = __webpack_require__(9);
var has = __webpack_require__(6);
var Iterators = __webpack_require__(14);
var $iterCreate = __webpack_require__(61);
var setToStringTag = __webpack_require__(29);
var getPrototypeOf = __webpack_require__(43);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(60);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(40)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(11);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(6);
var toIObject = __webpack_require__(8);
var arrayIndexOf = __webpack_require__(63)(false);
var IE_PROTO = __webpack_require__(26)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(6);
var toObject = __webpack_require__(30);
var IE_PROTO = __webpack_require__(26)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(67)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(37)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(71), __esModule: true };

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(48);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(81);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(83);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(42);
var hiddenKeys = __webpack_require__(28).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(18);
var createDesc = __webpack_require__(15);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(23);
var has = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(39);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(5) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(93);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(97);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(48);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _assign = __webpack_require__(45);

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = __webpack_require__(34);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(13);

var _createClass3 = _interopRequireDefault(_createClass2);

var _TextBox = __webpack_require__(19);

var _TextBox2 = _interopRequireDefault(_TextBox);

var _Explotion = __webpack_require__(107);

var _Explotion2 = _interopRequireDefault(_Explotion);

var _index = __webpack_require__(53);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Shoot = document.getElementById('shoot');

var SpaceShip = function () {
  function SpaceShip(ctx, width, height, x, y) {
    var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'red';
    var elements = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
    var viewport = arguments[7];
    var type = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 'invader';
    var skin = arguments[9];
    (0, _classCallCheck3.default)(this, SpaceShip);

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.viewport = viewport;
    this.color = color;
    this.elements = elements;
    this.isOver = false;
    this.overX = 0;
    this.overY = 0;
    this.bullets = [];
    this.type = type;
    this.points = 5;
    this.bulletsMomentum = 2 + Math.random();
    this.skin = skin;
    this.stime = 0;
    this.skinType = 'a';
  }

  (0, _createClass3.default)(SpaceShip, [{
    key: 'addBullet',
    value: function addBullet() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var bulletWidth = 2;
      var bulletHeight = 35;
      var owner = this;
      var _data$x = data.x,
          x = _data$x === undefined ? this.x + this.width / 2 - bulletWidth / 2 : _data$x,
          _data$y = data.y,
          y = _data$y === undefined ? this.y + this.height : _data$y;

      if (this.type === 'defender') y = this.y - bulletHeight + 10;
      var text = new _TextBox2.default(this.ctx, x, y, 'y=' + y, '12px arial', true);
      this.bullets.push({ bulletWidth: bulletWidth, bulletHeight: bulletHeight, x: x, y: y, text: text, owner: owner, type: 'bullet', tail: 0 });
      //if(this.type === 'defender')
      this.viewport.elements.push(new _Explotion2.default({
        ctx: this.ctx,
        x: this.x + this.width / 2,
        y: this.y,
        r: 2,
        duration: 100,
        color: {
          r: 255,
          g: 255,
          b: 255
        }
      }));
      Shoot.play();
    }
  }, {
    key: 'updateBullets',
    value: function updateBullets() {
      var _this = this;

      var ctx = this.ctx,
          bullets = this.bullets,
          viewport = this.viewport;

      this.bullets = bullets.filter(function (_ref) {
        var bulletHeight = _ref.bulletHeight,
            y = _ref.y,
            x = _ref.x;

        if (_this.type === 'defender' && y <= 0) return false;
        if (y + bulletHeight <= viewport.y + viewport.height) return true;
      });
    }
  }, {
    key: 'drawBullets',
    value: function drawBullets() {
      var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var ctx = this.ctx,
          bullets = this.bullets,
          type = this.type,
          x = this.x,
          y = this.y,
          height = this.height,
          width = this.width,
          viewport = this.viewport;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(bullets), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var bullet = _step.value;
          var bulletWidth = bullet.bulletWidth,
              bulletHeight = bullet.bulletHeight,
              _x6 = bullet.x,
              _y = bullet.y,
              text = bullet.text,
              tail = bullet.tail;

          ctx.beginPath();
          ctx.fillStyle = 'red';
          if (tail < bulletHeight) bullet.tail += 4;
          var gradient = ctx.createLinearGradient(_x6, _y, _x6, _y + tail);
          if (type === 'invader') {
            gradient.addColorStop(0, '#000b28');
            gradient.addColorStop(1, 'white');
          } else {
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(1, '#000b28');
          }
          ctx.fillStyle = gradient;
          ctx.fillRect(_x6, _y, bulletWidth, bulletHeight);
          ctx.closePath();
          if (debug) {
            text.x = _x6;
            text.y = _y;
            text.data = 'y=' + _y.toFixed(2);
            text.render();
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'updateTextBoxes',
    value: function updateTextBoxes(data) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(this.elements), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var element = _step2.value;

          element = (0, _assign2.default)(element, data);
          element.render();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'fire',
    value: function fire() {
      var bullets = this.bullets,
          ctx = this.ctx,
          bulletsMomentum = this.bulletsMomentum;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)(bullets), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var bullet = _step3.value;

          if (this.type === 'invader') bullet.y += bulletsMomentum;
          if (this.type === 'defender') bullet.y -= bulletsMomentum;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: 'shouldFire',
    value: function shouldFire() {
      var invaders = this.viewport.elements.filter(function (_ref2) {
        var type = _ref2.type;
        return type === 'invader';
      });
      var fireRate = 0.7;
      if (invaders.length < 15) fireRate = 0.5;
      if (invaders.length < 5) fireRate = 0.1;
      return invaders.every(function (invader) {
        return Math.random() < fireRate;
      });
    }
  }, {
    key: 'checkCollition',
    value: function checkCollition(bullet, index, entire, item, i, all) {
      var viewport = this.viewport,
          ctx = this.ctx;

      if ((0, _index.isOverLapping)(bullet, item)) {
        entire.splice(index, 1); //drop bullet
        //if(item.type !== 'defender' || item.type !== 'invader') return;
        item.color = 'orange';
        if (item.points - 1 === 0) item.color = 'red';
        item.points--;
        viewport.elements.push(new _Explotion2.default({ ctx: ctx, x: bullet.x, y: bullet.y }));
        return true;
      }
    }
  }, {
    key: 'bulletCollision',
    value: function bulletCollision(items) {
      var _this2 = this;

      var bullets = this.bullets,
          viewport = this.viewport,
          ctx = this.ctx;

      bullets.some(function (bullet, index, entire) {
        return items.some(_this2.checkCollition.bind(_this2, bullet, index, entire));
      });

      items.filter(function (others) {
        return others.type !== _this2.type && others.bullets.length && bullets.length;
      }).some(function (others, pos, all) {
        if (others.bullets.length > bullets.length) {
          others.bullets.some(function (othersBullet, otherIndex, othersBullets) {
            return bullets.some(function (currentBullets, currentBulletIndex, allBullets) {
              var result = (0, _index.isOverLapping)(othersBullet, currentBullets);
              if (result) {
                othersBullets.splice(otherIndex, 1);
                allBullets.splice(currentBulletIndex, 1);
                viewport.elements.push(new _Explotion2.default({ ctx: ctx, x: othersBullet.x, y: othersBullet.y }));
              }
              return result;
            });
          });
        } else {
          bullets.some(function (currentBullets, currentBulletIndex, allBullets) {
            return others.bullets.some(function (othersBullet, otherIndex, othersBullets) {
              var result = (0, _index.isOverLapping)(currentBullets, othersBullet);
              if (result) {
                othersBullets.splice(otherIndex, 1);
                allBullets.splice(currentBulletIndex, 1);
                viewport.elements.push(new _Explotion2.default({ ctx: ctx, x: othersBullet.x, y: othersBullet.y }));
              }
              return result;
            });
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var width = this.width,
          height = this.height,
          x = this.x,
          y = this.y,
          ctx = this.ctx,
          color = this.color,
          skin = this.skin,
          type = this.type,
          stime = this.stime,
          skinType = this.skinType;

      ctx.beginPath();
      //ctx.strokeStyle = color;
      if (type === 'defender') {
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, width, height);
      }
      if (type === 'invader') {
        if (this.skinType === 'b') ctx.drawImage(skin, 20 + 110 + 36, 14, 110, 80, x, y, width, height);
        if (this.skinType === 'a') ctx.drawImage(skin, 20, 14, 110, 80, x, y, width, height);
      }
      ctx.closePath();
      this.updateBullets();
      this.drawBullets(false);
      if (this.type === 'invader' && this.shouldFire()) {
        this.addBullet();
      }
      this.fire();
    }
  }]);
  return SpaceShip;
}();

exports.default = SpaceShip;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var calcCenter = exports.calcCenter = function calcCenter(container, item) {
  var x = container.x + container.width / 2 - item.width / 2;
  var y = container.y + container.height / 2 - item.height / 2;
  return { y: y, x: x };
};

var isOverLapping = exports.isOverLapping = function isOverLapping(a, b) {
  var x = a.x >= b.x && a.x <= b.x + (b.width || b.bulletWidth);
  var y = a.y >= b.y && a.y <= b.y + (b.height || b.bulletHeight);
  return x && y;
};

var clear = exports.clear = function clear(canvas) {
  return canvas.width = canvas.width;
};

var hover = exports.hover = function hover() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var cb = arguments[1];

  element.addEventListener('mousemove', function (e) {
    var data = element.getBoundingClientRect();
    var x = e.clientX - data.x;
    var y = e.clientY - data.y;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    cb({ x: x, y: y });
  });
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55);
module.exports = __webpack_require__(103);


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(34);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = __webpack_require__(115);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(118);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(46);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _assign = __webpack_require__(45);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(13);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(47);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(51);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Invader = __webpack_require__(77);

var _Invader2 = _interopRequireDefault(_Invader);

var _Defender = __webpack_require__(100);

var _Defender2 = _interopRequireDefault(_Defender);

var _Viewport = __webpack_require__(101);

var _Viewport2 = _interopRequireDefault(_Viewport);

var _TextBox = __webpack_require__(19);

var _TextBox2 = _interopRequireDefault(_TextBox);

var _BoxWrapper = __webpack_require__(102);

var _BoxWrapper2 = _interopRequireDefault(_BoxWrapper);

var _Controls2 = __webpack_require__(104);

var _Controls3 = _interopRequireDefault(_Controls2);

var _index = __webpack_require__(53);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intViewportWidth = window.innerWidth;
var intViewportHeight = window.innerHeight;
var canvas = document.getElementById('lienzo');
var canvasWidth = void 0;
if (intViewportWidth > 425) {
  canvasWidth = canvas.width = 425;
} else {
  canvasWidth = canvas.width = intViewportWidth;
}
var old = Date.now();

var canvasHeight = canvas.height = intViewportHeight;
var ctx = canvas.getContext('2d');
var viewport = new _Viewport2.default(canvas);

var Universe = function (_Controls) {
  (0, _inherits3.default)(Universe, _Controls);

  function Universe() {
    (0, _classCallCheck3.default)(this, Universe);

    viewport = (0, _assign2.default)(viewport, (0, _index.calcCenter)({ width: canvasWidth, height: canvasHeight, x: 0, y: 0 }, viewport));
    window.vp = viewport;
    viewport.y = 40;

    var _this = (0, _possibleConstructorReturn3.default)(this, (Universe.__proto__ || (0, _getPrototypeOf2.default)(Universe)).call(this, { viewport: viewport, ctx: ctx, canvas: canvas }));

    _this.FPS = 1000 / 60;
    _this.invadersMomentum = 1;
    return _this;
  }

  (0, _createClass3.default)(Universe, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var game = setInterval(function () {
        (0, _index.clear)(canvas);
        var invaders = viewport.get('invader');
        var defender = viewport.get('defender')[0];
        if (defender.points < 0 || invaders.length && invaders.some(function (invader) {
          return invader.y >= viewport.height + viewport.y;
        })) {
          alert("you lose");
          window.location.reload();
          return clearInterval(game);
        }

        if (invaders.length === 0) {
          alert("you win");
          window.location.reload();
          return clearInterval(game);
        }

        _this2.update();
      }, this.FPS);
    }
  }, {
    key: 'checkCollitions',
    value: function checkCollitions(element, index, entire) {
      if (element.type === 'defender') {
        element.bulletCollision(entire.filter(function (item) {
          return item.type === 'invader' || item.type === 'bullet';
        }), viewport.elements);
      } else if (element.type === 'invader') {
        element.bulletCollision(entire.filter(function (item) {
          return item.type === 'defender' || item.type === 'bullet';
        }), viewport.elements);
      }
    }
  }, {
    key: 'checkIsAlive',
    value: function checkIsAlive(element, index, entire) {
      if (element.type === 'invader') {
        if (element.points < 0) entire.splice(index, 1);
      }
    }
  }, {
    key: 'removeExplotions',
    value: function removeExplotions(element, index, entire) {
      if (entire[index].done) entire.splice(index, 1);
    }
  }, {
    key: 'update',
    value: function update() {
      this.renderJoyStick();
      viewport.render([this.checkIsAlive, this.checkCollitions, this.removeExplotions]);
      this.moveInvaders();

      if (Date.now() - old >= 1000) {
        viewport.get('invader').forEach(function (invader) {
          if (invader.skinType === 'a') {
            invader.skinType = 'b';
          } else {
            if (invader.skinType === 'b') invader.skinType = 'a';
          }
          old = Date.now();
        });
      }
    }
  }, {
    key: 'loadInvaders',
    value: function loadInvaders(_ref) {
      var _ref$rows = _ref.rows,
          rows = _ref$rows === undefined ? 0 : _ref$rows,
          x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          height = _ref.height,
          padding = _ref.padding,
          skin = _ref.skin;

      var color = 'white';
      ctx.beginPath();
      for (var i = 0; i < rows; i++) {
        x += width + padding;
        var invaderRow = new _Invader2.default(ctx, width, height, x, y, color, [new _TextBox2.default(ctx, x, y + padding, 'Hola mundo', true)], viewport, skin);
        viewport.elements.push(invaderRow);
      }
      ctx.closePath();
    }
  }, {
    key: 'loadDefender',
    value: function loadDefender() {
      var width = 20;
      var height = 20;
      var x = 0;
      var y = 0;
      var padding = 10;
      var color = 'green';
      var calc = (0, _index.calcCenter)(viewport, { x: x, y: y, width: width, height: height });
      x = calc.x;
      y = viewport.y + viewport.height - height - 20;
      var defender = new _Defender2.default(ctx, width, height, x, y, color, [new _TextBox2.default(ctx, x, y + padding, 'Hola mundo', true)], viewport, 'defender');
      viewport.elements.push(defender);
    }
  }, {
    key: 'loadSprites',
    value: function loadSprites(skin) {
      return fetch('/invaders-sprites.gif').then(function (response) {
        return response.blob();
      }).then(function (myBlob) {
        skin.src = URL.createObjectURL(myBlob);
      });
    }
  }, {
    key: 'preload',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var colums, padding, width, height, x, y, rows, HOW_MANY, skin, i;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                colums = 10;
                padding = 5;
                width = 25;
                height = 20;
                x = viewport.x - 20;
                y = viewport.y + width - 20;
                rows = Math.floor(vp.width / (width + padding)) - 1;
                HOW_MANY = 4;
                skin = new Image();
                _context.next = 11;
                return this.loadSprites(skin);

              case 11:
                for (i = 0; i < HOW_MANY; i++) {
                  this.loadInvaders({ rows: rows, x: x, y: y + 25 * i, width: width, height: height, padding: padding, skin: skin });
                }
                this.loadDefender();
                this.startControls();

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function preload() {
        return _ref2.apply(this, arguments);
      }

      return preload;
    }()
  }, {
    key: 'moveInvaders',
    value: function moveInvaders() {
      var invaders = viewport.get('invader');
      var acceletarion = 0.02;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(invaders), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var invader = _step.value;

          var calc = Math.sin(this.invadersMomentum) * 2;
          invader.x += calc;
          invader.y += acceletarion;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.invadersMomentum += 0.06;
    }
  }]);
  return Universe;
}(_Controls3.default);

var space = new Universe();
space.preload();
space.render();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35);
__webpack_require__(44);
module.exports = __webpack_require__(68);


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(58);
var step = __webpack_require__(59);
var Iterators = __webpack_require__(14);
var toIObject = __webpack_require__(8);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(37)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(24);
var descriptor = __webpack_require__(15);
var setToStringTag = __webpack_require__(29);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(10);
var getKeys = __webpack_require__(16);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(8);
var toLength = __webpack_require__(64);
var toAbsoluteIndex = __webpack_require__(65);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(25);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var defined = __webpack_require__(21);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var get = __webpack_require__(69);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(70);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(20);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(73) });


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(16);
var gOPS = __webpack_require__(31);
var pIE = __webpack_require__(18);
var toObject = __webpack_require__(30);
var IObject = __webpack_require__(36);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(12)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(46);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(47);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(51);

var _inherits3 = _interopRequireDefault(_inherits2);

var _TextBox = __webpack_require__(19);

var _TextBox2 = _interopRequireDefault(_TextBox);

var _SpaceShip2 = __webpack_require__(52);

var _SpaceShip3 = _interopRequireDefault(_SpaceShip2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Invaders = function (_SpaceShip) {
  (0, _inherits3.default)(Invaders, _SpaceShip);

  function Invaders(ctx, width, height, x, y) {
    var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'red';
    var elements = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
    var viewport = arguments[7];
    var skin = arguments[8];
    (0, _classCallCheck3.default)(this, Invaders);
    return (0, _possibleConstructorReturn3.default)(this, (Invaders.__proto__ || (0, _getPrototypeOf2.default)(Invaders)).call(this, ctx, width, height, x, y, color = 'white', elements, viewport, 'invader', skin));
  }

  return Invaders;
}(_SpaceShip3.default);

exports.default = Invaders;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(30);
var $getPrototypeOf = __webpack_require__(43);

__webpack_require__(80)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(12);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
__webpack_require__(35);
module.exports = __webpack_require__(32).f('iterator');


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85);
__webpack_require__(90);
__webpack_require__(91);
__webpack_require__(92);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(6);
var DESCRIPTORS = __webpack_require__(5);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(41);
var META = __webpack_require__(86).KEY;
var $fails = __webpack_require__(12);
var shared = __webpack_require__(27);
var setToStringTag = __webpack_require__(29);
var uid = __webpack_require__(17);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(32);
var wksDefine = __webpack_require__(33);
var enumKeys = __webpack_require__(87);
var isArray = __webpack_require__(88);
var anObject = __webpack_require__(10);
var isObject = __webpack_require__(11);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(23);
var createDesc = __webpack_require__(15);
var _create = __webpack_require__(24);
var gOPNExt = __webpack_require__(89);
var $GOPD = __webpack_require__(50);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(16);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(49).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(18).f = $propertyIsEnumerable;
  __webpack_require__(31).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(22)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(17)('meta');
var isObject = __webpack_require__(11);
var has = __webpack_require__(6);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(12)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(16);
var gOPS = __webpack_require__(31);
var pIE = __webpack_require__(18);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(20);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(8);
var gOPN = __webpack_require__(49).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 90 */
/***/ (function(module, exports) {



/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('asyncIterator');


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('observable');


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(3);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(96).set });


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(11);
var anObject = __webpack_require__(10);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(38)(Function.call, __webpack_require__(50).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(98), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(99);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(24) });


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(46);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(47);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(51);

var _inherits3 = _interopRequireDefault(_inherits2);

var _TextBox = __webpack_require__(19);

var _TextBox2 = _interopRequireDefault(_TextBox);

var _SpaceShip2 = __webpack_require__(52);

var _SpaceShip3 = _interopRequireDefault(_SpaceShip2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Defender = function (_SpaceShip) {
  (0, _inherits3.default)(Defender, _SpaceShip);

  function Defender(ctx, width, height, x, y, color) {
    var elements = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
    var viewport = arguments[7];
    var skin = arguments[8];
    (0, _classCallCheck3.default)(this, Defender);
    return (0, _possibleConstructorReturn3.default)(this, (Defender.__proto__ || (0, _getPrototypeOf2.default)(Defender)).call(this, ctx, width, height, x, y, 'green', elements = [], viewport, 'defender', skin));
  }

  return Defender;
}(_SpaceShip3.default);

exports.default = Defender;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(13);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Viewport = function () {
  function Viewport(element) {
    (0, _classCallCheck3.default)(this, Viewport);

    var scale = 0.75;
    this.ctx = element.getContext('2d');
    this.width = element.width * 0.8;
    this.height = element.height * scale;
    this.x = 0;
    this.y = 0;
    this.elements = [];
  }

  (0, _createClass3.default)(Viewport, [{
    key: 'get',
    value: function get() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      return this.elements.filter(function (item) {
        return item.type === id;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var midlewares = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var ctx = this.ctx,
          x = this.x,
          y = this.y,
          width = this.width,
          height = this.height,
          elements = this.elements;

      elements.forEach(function (element, index, entire) {
        midlewares.forEach(function (midleware) {
          return midleware(element, index, entire);
        });
        element.render();
      });
      //ctx.beginPath();
      //ctx.strokeStyle = 'white';
      // ctx.rect(x, y, width, height);
      //ctx.stroke();
      //ctx.closePath();
    }
  }]);
  return Viewport;
}();

exports.default = Viewport;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(13);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BoxWrapper = function () {
  function BoxWrapper(ctx, x, y, width, height) {
    var display = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    var style = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'stroke';
    var color = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'red';
    (0, _classCallCheck3.default)(this, BoxWrapper);

    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.display = display;
    this.style = style;
    this.color = color;
  }

  (0, _createClass3.default)(BoxWrapper, [{
    key: 'updateTextBoxes',
    value: function updateTextBoxes() {}
  }, {
    key: 'render',
    value: function render() {
      var ctx = this.ctx,
          x = this.x,
          y = this.y,
          width = this.width,
          height = this.height,
          display = this.display,
          style = this.style,
          color = this.color;

      if (display) {
        ctx.beginPath();
        ctx.save();
        if (style === 'stroke') {
          ctx.strokeStyle = color;
          ctx.strokeRect(x, y, width, height);
        } else {
          ctx.fillStyle = color;
          ctx.fillRect(x, y, width, height);
        }
        ctx.restore();
        ctx.closePath();
      }
    }
  }]);
  return BoxWrapper;
}();

exports.default = BoxWrapper;

/***/ }),
/* 103 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(13);

var _createClass3 = _interopRequireDefault(_createClass2);

var _JoyStick = __webpack_require__(105);

var _JoyStick2 = _interopRequireDefault(_JoyStick);

var _index = __webpack_require__(53);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Controls = function () {
  function Controls(_ref) {
    var ctx = _ref.ctx,
        viewport = _ref.viewport,
        canvas = _ref.canvas;
    (0, _classCallCheck3.default)(this, Controls);

    var x = 0;
    var y = viewport.y + viewport.height + 30;
    var height = canvas.height - viewport.height;
    var width = canvas.width;
    this.canvas = canvas;
    this.joystick = new _JoyStick2.default({ ctx: ctx, x: x, y: y, height: height, width: width, fire: 'red', left: 'red', right: 'red' });
    this.viewport = viewport;
  }

  (0, _createClass3.default)(Controls, [{
    key: 'renderJoyStick',
    value: function renderJoyStick() {
      this.joystick.render();
    }
  }, {
    key: 'startControls',
    value: function startControls() {
      this.keyEvents();
      this.controls();
      this.joystick.render();
    }
  }, {
    key: 'keyEvents',
    value: function keyEvents() {
      var KeySpace = 32;
      var keyLeft = 37;
      var keyRigth = 39;
      var momentum = 10 + Math.random();
      var viewport = this.viewport;

      var defender = viewport.get('defender')[0];
      window.onkeydown = function (e) {
        if (e.keyCode === KeySpace) {
          defender.addBullet({ y: defender.y });
        }
        if (e.keyCode === keyLeft) {
          if (defender.x + defender.width - 20 <= viewport.x) return;
          defender.x -= momentum;
        }
        if (e.keyCode === keyRigth) {
          if (defender.x + defender.width >= viewport.width + viewport.x) return;
          defender.x += momentum;
        }
      };
    }
  }, {
    key: 'controls',
    value: function controls() {
      var _this = this;

      var viewport = this.viewport,
          canvas = this.canvas;

      var defender = viewport.get('defender')[0];
      var momentum = 10 + Math.random();
      canvas.addEventListener('mousedown', function (e) {
        var data = canvas.getBoundingClientRect();
        var x = e.clientX - data.x;
        var y = e.clientY - data.y;
        var overFire = (0, _index.isOverLapping)({ x: x, y: y, height: 20, width: 20 }, _this.joystick.fireData);
        var overRigth = (0, _index.isOverLapping)({ x: x, y: y, height: 20, width: 20 }, _this.joystick.rigthData);
        var overLeft = (0, _index.isOverLapping)({ x: x, y: y, height: 20, width: 20 }, _this.joystick.leftData);
        if (overFire) {
          _this.joystick.fireData.color = 'rgba(255, 255, 255, 0.5)';
          defender.addBullet({ y: defender.y });
        }

        if (overRigth) {
          _this.joystick.rigthData.color = 'rgba(255, 255, 255, 0.5)';
          if (defender.x + defender.width >= viewport.width + viewport.x) return;
          defender.x += momentum;
        }
        if (overLeft) {
          _this.joystick.leftData.color = 'rgba(255, 255, 255, 0.5)';
          if (defender.x + defender.width - 20 <= viewport.x) return;
          defender.x -= momentum;
        }
      });

      canvas.addEventListener('mouseup', function (e) {
        setTimeout(function () {
          _this.joystick.fireData.color = 'white';
          _this.joystick.rigthData.color = 'white';
          _this.joystick.leftData.color = 'white';
        }, 200);
      });
    }
  }]);
  return Controls;
}();

exports.default = Controls;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(13);

var _createClass3 = _interopRequireDefault(_createClass2);

var _index = __webpack_require__(53);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JoyStick = function () {
  function JoyStick(_ref) {
    var ctx = _ref.ctx,
        x = _ref.x,
        y = _ref.y,
        height = _ref.height,
        width = _ref.width,
        left = _ref.left,
        rigth = _ref.rigth,
        fire = _ref.fire;
    (0, _classCallCheck3.default)(this, JoyStick);

    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.fire = fire;
    this.rigth = rigth;
    this.left = left;
    this.height = height;
    this.width = width;
    var data = (0, _index.calcCenter)({ x: x, y: y, width: width, height: height }, { width: 60, height: 40, x: 0, y: 0 });
    var pullX = 10;
    var pushX = 10;
    this.fireData = {
      x: data.x + 10,
      y: y + 15,
      height: 40,
      width: 40
    };
    this.rigthData = {
      x: x + (width - 60) - pullX,
      y: y + 15,
      width: 60,
      height: 40
    };
    this.leftData = {
      x: x + pushX,
      y: y + 15,
      width: 60,
      height: 40
    };
  }

  (0, _createClass3.default)(JoyStick, [{
    key: 'arrowLeft',
    value: function arrowLeft() {
      var ctx = this.ctx,
          x = this.x,
          y = this.y,
          width = this.width,
          height = this.height,
          leftData = this.leftData;

      var pushX = 10;
      ctx.beginPath();
      //ctx.strokeRect(x+pushX, y+15, 60, 40);
      ctx.fillStyle = 'white';
      ctx.lineTo(x + pushX + 60, y + 15, 4, 4);
      ctx.lineTo(x + pushX + 10, y + 15 + 20, 4, 4);
      ctx.lineTo(x + pushX + 60, y + 15 + 40, 4, 4);
      ctx.fillStyle = leftData.color || 'white';
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: 'arrowRigth',
    value: function arrowRigth() {
      var ctx = this.ctx,
          x = this.x,
          y = this.y,
          width = this.width,
          height = this.height,
          rigthData = this.rigthData;

      var pullX = 10;
      ctx.beginPath();
      //ctx.strokeRect(x+(width-60)-pullX, y+15, 60, 40);
      ctx.lineTo(x + (width - 60) - pullX, y + 15, 4, 4);
      ctx.lineTo(x + (width - 60) - pullX + 60 - 15, y + 15 + 20, 4, 4);
      ctx.lineTo(x + (width - 60) - pullX, y + 15 + 40, 4, 4);
      ctx.fillStyle = rigthData.color || 'white';
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: 'fireButton',
    value: function fireButton() {
      var ctx = this.ctx,
          x = this.x,
          y = this.y,
          width = this.width,
          height = this.height,
          fireData = this.fireData;

      ctx.beginPath();
      //ctx.strokeRect(fireData.x, fireData.y, fireData.width, fireData.height);
      ctx.fillStyle = fireData.color || 'white';
      ctx.arc(fireData.x + 20, fireData.y + 20, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: 'render',
    value: function render() {
      var ctx = this.ctx,
          x = this.x,
          y = this.y,
          width = this.width,
          height = this.height,
          fire = this.fire,
          left = this.left,
          rigth = this.rigth;

      ctx.beginPath();
      // ctx.strokeStyle = 'white';
      //ctx.strokeRect(x, y, width, height);     
      ctx.closePath();
      this.arrowLeft();
      this.arrowRigth();
      this.fireButton();
    }
  }]);
  return JoyStick;
}();

exports.default = JoyStick;

/***/ }),
/* 106 */,
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(13);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Explotion = function () {
  function Explotion(_ref) {
    var ctx = _ref.ctx,
        x = _ref.x,
        y = _ref.y,
        _ref$r = _ref.r,
        r = _ref$r === undefined ? 5 : _ref$r,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 25 : _ref$duration,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? { r: '255', g: '255', b: '255' } : _ref$color;
    (0, _classCallCheck3.default)(this, Explotion);

    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.duration = duration;
    this.r = r;
    this.done = false;
    this.light = 1;
    this.color = color;
  }

  (0, _createClass3.default)(Explotion, [{
    key: 'render',
    value: function render() {
      var ctx = this.ctx,
          x = this.x,
          y = this.y,
          duration = this.duration,
          r = this.r,
          done = this.done,
          color = this.color,
          light = this.light;

      if (duration <= 0) this.done = true;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + light + ')';
      ctx.fill();
      ctx.closePath();
      this.r += 0.5 + Math.random();
      this.light -= 0.08;
      this.duration -= 0.5;
    }
  }]);
  return Explotion;
}();

exports.default = Explotion;

/***/ }),
/* 108 */,
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(60);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 110 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(10);
var aFunction = __webpack_require__(60);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(38);
var invoke = __webpack_require__(126);
var html = __webpack_require__(66);
var cel = __webpack_require__(40);
var global = __webpack_require__(1);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(20)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var isObject = __webpack_require__(11);
var newPromiseCapability = __webpack_require__(109);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(116);


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(117);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(110)))

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(110)))

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(119);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
__webpack_require__(44);
__webpack_require__(35);
__webpack_require__(121);
__webpack_require__(131);
__webpack_require__(132);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(22);
var global = __webpack_require__(1);
var ctx = __webpack_require__(38);
var classof = __webpack_require__(70);
var $export = __webpack_require__(3);
var isObject = __webpack_require__(11);
var aFunction = __webpack_require__(60);
var anInstance = __webpack_require__(122);
var forOf = __webpack_require__(123);
var speciesConstructor = __webpack_require__(111);
var task = __webpack_require__(112).set;
var microtask = __webpack_require__(127)();
var newPromiseCapabilityModule = __webpack_require__(109);
var perform = __webpack_require__(113);
var promiseResolve = __webpack_require__(114);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(128)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(29)($Promise, PROMISE);
__webpack_require__(129)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(130)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(38);
var call = __webpack_require__(124);
var isArrayIter = __webpack_require__(125);
var anObject = __webpack_require__(10);
var toLength = __webpack_require__(64);
var getIterFn = __webpack_require__(69);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(10);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(14);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 126 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var macrotask = __webpack_require__(112).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(20)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var dP = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(5);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var global = __webpack_require__(1);
var speciesConstructor = __webpack_require__(111);
var promiseResolve = __webpack_require__(114);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(109);
var perform = __webpack_require__(113);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map