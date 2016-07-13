// GENERATED CODE BY BUCKLESCRIPT VERSION 0.8.1 , PLEASE EDIT WITH CARE
'use strict';

var Block      = require("./block");
var Caml_array = require("./caml_array");
var $$Array    = require("./array");

function value_of_int32(x) {
  return /* Int32 */Block.__(0, [x]);
}

function value_of_int64(x) {
  return /* Int64 */Block.__(1, [x]);
}

function value_of_int(x) {
  return /* Int */Block.__(2, [x]);
}

function value_of_nativeint(x) {
  return /* Nativeint */Block.__(3, [x]);
}

function value_of_bool(x) {
  return /* Bool */Block.__(4, [x]);
}

function value_of_float(x) {
  return /* Float */Block.__(5, [x]);
}

function value_of_char(x) {
  return /* Char */Block.__(6, [x]);
}

function value_of_string(x) {
  return /* String */Block.__(7, [x]);
}

function array_map(f, a) {
  var l = a.length;
  if (l) {
    var r = Caml_array.caml_make_vect(l, f(a[0]));
    for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = f(a[i]);
    }
    return r;
  }
  else {
    return /* array */[];
  }
}

function value_of_array(k, x) {
  return /* Array */Block.__(10, [array_map(k, x)]);
}

function value_of_list(k, x) {
  return /* Array */Block.__(10, [array_map(k, $$Array.of_list(x))]);
}

function value_of_record(labels, v) {
  return /* Record */Block.__(12, [
            labels,
            v
          ]);
}

function value_of_variant(labels, tag, vs) {
  return /* Variant */Block.__(13, [
            labels,
            tag,
            vs
          ]);
}

function value_of_tuple_2(k0, k1, param) {
  return /* Tuple */Block.__(9, [/* array */[
              k0(param[0]),
              k1(param[1])
            ]]);
}

function value_of_tuple_3(k0, k1, k2, param) {
  return /* Tuple */Block.__(9, [/* array */[
              k0(param[0]),
              k1(param[1]),
              k2(param[2])
            ]]);
}

function value_of_tuple_4(k0, k1, k2, k3, param) {
  return /* Tuple */Block.__(9, [/* array */[
              k0(param[0]),
              k1(param[1]),
              k2(param[2]),
              k3(param[3])
            ]]);
}

function value_of_tuple_5(k0, k1, k2, k3, k4, param) {
  return /* Tuple */Block.__(9, [/* array */[
              k0(param[0]),
              k1(param[1]),
              k2(param[2]),
              k3(param[3]),
              k4(param[4])
            ]]);
}

function value_of_tuple_6(k0, k1, k2, k3, k4, k5, param) {
  return /* Tuple */Block.__(9, [/* array */[
              k0(param[0]),
              k1(param[1]),
              k2(param[2]),
              k3(param[3]),
              k4(param[4]),
              k5(param[5])
            ]]);
}

function value_of_option(k, x) {
  if (x) {
    return /* OptionSome */Block.__(8, [k(x[0])]);
  }
  else {
    return /* OptionNone */0;
  }
}

exports.value_of_int32     = value_of_int32;
exports.value_of_int64     = value_of_int64;
exports.value_of_int       = value_of_int;
exports.value_of_nativeint = value_of_nativeint;
exports.value_of_bool      = value_of_bool;
exports.value_of_float     = value_of_float;
exports.value_of_char      = value_of_char;
exports.value_of_string    = value_of_string;
exports.value_of_array     = value_of_array;
exports.value_of_list      = value_of_list;
exports.value_of_record    = value_of_record;
exports.value_of_variant   = value_of_variant;
exports.value_of_option    = value_of_option;
exports.value_of_tuple_2   = value_of_tuple_2;
exports.value_of_tuple_3   = value_of_tuple_3;
exports.value_of_tuple_4   = value_of_tuple_4;
exports.value_of_tuple_5   = value_of_tuple_5;
exports.value_of_tuple_6   = value_of_tuple_6;
/* value_of_int32 Not a pure module */
