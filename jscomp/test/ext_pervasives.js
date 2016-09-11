'use strict';

var Caml_builtin_exceptions = require("../../lib/js/caml_builtin_exceptions");
var Caml_obj                = require("../../lib/js/caml_obj");
var Obj                     = require("../../lib/js/obj");
var Pervasives              = require("../../lib/js/pervasives");
var Caml_exceptions         = require("../../lib/js/caml_exceptions");
var Arg                     = require("../../lib/js/arg");
var Block                   = require("../../lib/js/block");
var Curry                   = require("../../lib/js/curry");
var Printf                  = require("../../lib/js/printf");
var $$Array                 = require("../../lib/js/array");
var $$String                = require("../../lib/js/string");
var Format                  = require("../../lib/js/format");
var List                    = require("../../lib/js/list");

function $$finally(v, action, f) {
  var exit = 0;
  var e;
  try {
    e = Curry._1(f, v);
    exit = 1;
  }
  catch (e$1){
    Curry._1(action, v);
    throw e$1;
  }
  if (exit === 1) {
    Curry._1(action, v);
    return e;
  }
  
}

function with_file_as_chan(filename, f) {
  return $$finally(Pervasives.open_out(filename), Pervasives.close_out, f);
}

function with_file_as_pp(filename, f) {
  return $$finally(Pervasives.open_out(filename), Pervasives.close_out, function (chan) {
              var fmt = Format.formatter_of_out_channel(chan);
              var v = Curry._1(f, fmt);
              Format.pp_print_flush(fmt, /* () */0);
              return v;
            });
}

function is_pos_pow(n) {
  var E = Caml_exceptions.create("E");
  try {
    var _c = 0;
    var _n = n;
    while(true) {
      var n$1 = _n;
      var c = _c;
      if (n$1 <= 0) {
        return -2;
      }
      else if (n$1 === 1) {
        return c;
      }
      else if (n$1 & 1) {
        throw E;
      }
      else {
        _n = (n$1 >> 1);
        _c = c + 1 | 0;
        continue ;
        
      }
    };
  }
  catch (exn){
    if (exn === E) {
      return -1;
    }
    else {
      throw exn;
    }
  }
}

function failwithf(loc, fmt) {
  return Format.ksprintf(function (s) {
              var s$1 = loc + s;
              throw [
                    Caml_builtin_exceptions.failure,
                    s$1
                  ];
            }, fmt);
}

function invalid_argf(fmt) {
  return Format.ksprintf(Pervasives.invalid_arg, fmt);
}

function bad_argf(fmt) {
  return Format.ksprintf(function (x) {
              throw [
                    Arg.Bad,
                    x
                  ];
            }, fmt);
}

function dump(r) {
  if (typeof r === "number") {
    return "" + r;
  }
  else {
    var get_fields = function (_acc, _n) {
      while(true) {
        var n = _n;
        var acc = _acc;
        if (n !== 0) {
          var n$1 = n - 1 | 0;
          _n = n$1;
          _acc = /* :: */[
            r[n$1],
            acc
          ];
          continue ;
          
        }
        else {
          return acc;
        }
      };
    };
    var is_list = function (_r) {
      while(true) {
        var r = _r;
        if (typeof r === "number") {
          return Caml_obj.caml_equal(r, 0);
        }
        else {
          var s = r.length;
          var t = r.tag | 0;
          if (t) {
            return /* false */0;
          }
          else if (s === 2) {
            _r = r[1];
            continue ;
            
          }
          else {
            return /* false */0;
          }
        }
      };
    };
    var get_list = function (r) {
      if (typeof r === "number") {
        return /* [] */0;
      }
      else {
        var h = r[0];
        var t = get_list(r[1]);
        return /* :: */[
                h,
                t
              ];
      }
    };
    var s = r.length;
    var t = r.tag | 0;
    if (is_list(r)) {
      var fields = get_list(r);
      return "[" + ($$String.concat("; ", List.map(dump, fields)) + "]");
    }
    else if (t !== 0) {
      if (t === Obj.lazy_tag) {
        return "<lazy>";
      }
      else if (t === Obj.closure_tag) {
        return "<closure>";
      }
      else if (t === Obj.object_tag) {
        var fields$1 = get_fields(/* [] */0, s);
        var match;
        if (fields$1) {
          var match$1 = fields$1[1];
          if (match$1) {
            match = /* tuple */[
              fields$1[0],
              match$1[0],
              match$1[1]
            ];
          }
          else {
            throw [
                  Caml_builtin_exceptions.assert_failure,
                  [
                    "ext_pervasives.ml",
                    118,
                    15
                  ]
                ];
          }
        }
        else {
          throw [
                Caml_builtin_exceptions.assert_failure,
                [
                  "ext_pervasives.ml",
                  118,
                  15
                ]
              ];
        }
        return "Object #" + (dump(match[1]) + (" (" + ($$String.concat(", ", List.map(dump, match[2])) + ")")));
      }
      else if (t === Obj.infix_tag) {
        return "<infix>";
      }
      else if (t === Obj.forward_tag) {
        return "<forward>";
      }
      else if (t < Obj.no_scan_tag) {
        var fields$2 = get_fields(/* [] */0, s);
        return "Tag" + (t + (" (" + ($$String.concat(", ", List.map(dump, fields$2)) + ")")));
      }
      else if (t === Obj.string_tag) {
        return '"' + ($$String.escaped(r) + '"');
      }
      else if (t === Obj.double_tag) {
        return Pervasives.string_of_float(r);
      }
      else if (t === Obj.abstract_tag) {
        return "<abstract>";
      }
      else if (t === Obj.custom_tag) {
        return "<custom>";
      }
      else if (t === Obj.custom_tag) {
        return "<final>";
      }
      else if (t === Obj.double_array_tag) {
        return "[|" + ($$String.concat(";", $$Array.to_list($$Array.map(Pervasives.string_of_float, r))) + "|]");
      }
      else {
        var name = Curry._2(Printf.sprintf(/* Format */[
                  /* String_literal */Block.__(11, [
                      "unknown: tag ",
                      /* Int */Block.__(4, [
                          /* Int_d */0,
                          /* No_padding */0,
                          /* No_precision */0,
                          /* String_literal */Block.__(11, [
                              " size ",
                              /* Int */Block.__(4, [
                                  /* Int_d */0,
                                  /* No_padding */0,
                                  /* No_precision */0,
                                  /* End_of_format */0
                                ])
                            ])
                        ])
                    ]),
                  "unknown: tag %d size %d"
                ]), t, s);
        return "<" + (name + ">");
      }
    }
    else {
      var fields$3 = get_fields(/* [] */0, s);
      return "(" + ($$String.concat(", ", List.map(dump, fields$3)) + ")");
    }
  }
}

var dump$1 = dump

exports.$$finally         = $$finally;
exports.with_file_as_chan = with_file_as_chan;
exports.with_file_as_pp   = with_file_as_pp;
exports.is_pos_pow        = is_pos_pow;
exports.failwithf         = failwithf;
exports.invalid_argf      = invalid_argf;
exports.bad_argf          = bad_argf;
exports.dump              = dump$1;
/* Format Not a pure module */
