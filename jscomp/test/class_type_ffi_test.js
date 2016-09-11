'use strict';


function sum_float_array(arr) {
  var v = 0;
  for(var i = 0 ,i_finish = arr.length - 1 | 0; i <= i_finish; ++i){
    v += arr.case(i);
  }
  return v;
}

function sum_int_array(arr) {
  var v = 0;
  for(var i = 0 ,i_finish = arr.length - 1 | 0; i <= i_finish; ++i){
    v = v + arr.case(i) | 0;
  }
  return v;
}

function sum_poly(zero, add, arr) {
  var v = zero;
  for(var i = 0 ,i_finish = arr.length - 1 | 0; i <= i_finish; ++i){
    v = add(v, arr.case(i));
  }
  return v;
}

function test_set(x) {
  return x.length = 3;
}

function f(x) {
  x.bark("he");
  return x.fight();
}

function ff(fn, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
  return fn(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
}

exports.sum_float_array = sum_float_array;
exports.sum_int_array   = sum_int_array;
exports.sum_poly        = sum_poly;
exports.test_set        = test_set;
exports.f               = f;
exports.ff              = ff;
/* No side effect */
