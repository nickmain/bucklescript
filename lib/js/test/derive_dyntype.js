// GENERATED CODE BY BUCKLESCRIPT VERSION 0.8.1 , PLEASE EDIT WITH CARE
'use strict';

var Block  = require("../block");
var Js_dyn = require("../js_dyn");

var all_branches_of_t_000 = /* constructors : array */[
  "Monday",
  "Tuesday",
  "SpecialDay"
];

var all_branches_of_t_001 = /* arities : array */[
  0,
  0,
  1,
  2,
  1
];

var all_branches_of_t = /* record */[
  all_branches_of_t_000,
  all_branches_of_t_001
];

function _value_of_t(value) {
  if (typeof value === "number") {
    if (value) {
      return /* Variant */Block.__(13, [
                all_branches_of_t,
                1,
                /* array */[]
              ]);
    }
    else {
      return /* Variant */Block.__(13, [
                all_branches_of_t,
                0,
                /* array */[]
              ]);
    }
  }
  else {
    switch (value.tag | 0) {
      case 0 : 
          return /* Variant */Block.__(13, [
                    all_branches_of_t,
                    2,
                    /* array */[Js_dyn.value_of_int(value[0])]
                  ]);
      case 1 : 
          return /* Variant */Block.__(13, [
                    all_branches_of_t,
                    3,
                    /* array */[
                      Js_dyn.value_of_int(value[0]),
                      Js_dyn.value_of_int(value[1])
                    ]
                  ]);
      case 2 : 
          return /* Variant */Block.__(13, [
                    all_branches_of_t,
                    4,
                    /* array */[Js_dyn.value_of_tuple_2(Js_dyn.value_of_int, Js_dyn.value_of_int, value[0])]
                  ]);
      case 3 : 
          return /* Variant */Block.__(13, [
                    all_branches_of_t,
                    5,
                    /* array */[_value_of_t(value[0])]
                  ]);
      
    }
  }
}

var value_of_t = _value_of_t

var all_fields_of_t = /* record */[/* labels : array */[
    "x",
    "y",
    "z"
  ]];

function value_of_u(value) {
  return /* Record */Block.__(12, [
            all_fields_of_t,
            /* array */[
              Js_dyn.value_of_int(value[/* x */0]),
              value_of_t(value[/* y */1]),
              Js_dyn.value_of_string(value[/* z */2])
            ]
          ]);
}

exports.value_of_t = value_of_t;
exports.value_of_u = value_of_u;
/* value_of_t Not a pure module */
