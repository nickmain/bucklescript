'use strict';

var Bytes                   = require("../../lib/js/bytes");
var Caml_builtin_exceptions = require("../../lib/js/caml_builtin_exceptions");
var Caml_exceptions         = require("../../lib/js/caml_exceptions");
var Mt                      = require("./mt");
var Caml_bytes              = require("../../lib/js/caml_bytes");
var Caml_string             = require("../../lib/js/caml_string");

var v = "gso";

function is_equal() {
  if (Caml_bytes.get(Bytes.make(3, /* "a" */97), 0) !== /* "a" */97) {
    throw [
          Caml_builtin_exceptions.assert_failure,
          [
            "equal_exception_test.ml",
            9,
            4
          ]
        ];
  }
  if (Bytes.make(3, /* "a" */97)[0] !== /* "a" */97) {
    throw [
          Caml_builtin_exceptions.assert_failure,
          [
            "equal_exception_test.ml",
            10,
            4
          ]
        ];
  }
  var u = Bytes.make(3, /* "a" */97);
  u[0] = /* "b" */98;
  if (u[0] !== /* "b" */98) {
    throw [
          Caml_builtin_exceptions.assert_failure,
          [
            "equal_exception_test.ml",
            13,
            4
          ]
        ];
  }
  if (Caml_string.get(v, 0) === /* "g" */103) {
    return 0;
  }
  else {
    throw [
          Caml_builtin_exceptions.assert_failure,
          [
            "equal_exception_test.ml",
            14,
            4
          ]
        ];
  }
}

function is_exception() {
  try {
    throw Caml_builtin_exceptions.not_found;
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return /* () */0;
    }
    else {
      throw exn;
    }
  }
}

function is_normal_exception() {
  var A = Caml_exceptions.create("A");
  var v = [
    A,
    3
  ];
  try {
    throw v;
  }
  catch (exn){
    if (exn[0] === A) {
      if (exn[1] !== 3) {
        throw exn;
      }
      else {
        return /* () */0;
      }
    }
    else {
      throw exn;
    }
  }
}

function is_arbitrary_exception() {
  var A = Caml_exceptions.create("A");
  try {
    throw A;
  }
  catch (exn){
    return /* () */0;
  }
}

var suites_000 = /* tuple */[
  "is_equal",
  is_equal
];

var suites_001 = /* :: */[
  /* tuple */[
    "is_exception",
    is_exception
  ],
  /* :: */[
    /* tuple */[
      "is_normal_exception",
      is_normal_exception
    ],
    /* :: */[
      /* tuple */[
        "is_arbitrary_exception",
        is_arbitrary_exception
      ],
      /* [] */0
    ]
  ]
];

var suites = /* :: */[
  suites_000,
  suites_001
];

Mt.from_suites("exception", suites);

exports.v                      = v;
exports.is_equal               = is_equal;
exports.is_exception           = is_exception;
exports.is_normal_exception    = is_normal_exception;
exports.is_arbitrary_exception = is_arbitrary_exception;
exports.suites                 = suites;
/*  Not a pure module */
