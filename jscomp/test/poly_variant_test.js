'use strict';

var Fs = require("fs");


function hey_string (option){
  switch(option){
  case "on_closed" : return 1 ;
  case "on_open" : return 2 ; 
  case "in" : return 3;
  default : throw Error ("impossible")
 }
}
function hey_int (option){
  switch (option){
   case 0 : return 1;
   case 3 : return 3;
   case 4 : return 4;
   default : throw Error("impossible")
  }
 }

;

var uu = /* int array */[
  hey_string("on_open"),
  hey_string("on_closed"),
  hey_string("in")
];

var vv = /* int array */[
  hey_int(3),
  hey_int(0),
  hey_int(4)
];

hey_string("on_closed");

hey_string("in");

function register(readline) {
  readline.on("line", function (s) {
        console.log(s);
        return /* () */0;
      });
  return readline.on("close", function () {
              console.log("finished");
              return /* () */0;
            });
}

function read(name) {
  return Fs.readFileSync(name, "utf8");
}

function read$1(name) {
  return Fs.readFileSync(name, "utf8");
}

function test(readline, x) {
  return readline.on(function (action) {
              switch (x) {
                case -944564236 : 
                    return action[0];
                case -933029960 : 
                    return action[0];
                
              }
            }, function (action) {
              switch (x) {
                case -944564236 : 
                    return action[1];
                case -933029960 : 
                    return action[1];
                
              }
            });
}

function on2(prim, prim$1) {
  return prim.on2(function (action) {
              switch (prim$1) {
                case -944564236 : 
                    return action[0];
                case -933029960 : 
                    return action[0];
                
              }
            }, function (action) {
              switch (prim$1) {
                case -944564236 : 
                    return action[1];
                case -933029960 : 
                    return action[1];
                
              }
            });
}

var readN = read$1;

exports.uu       = uu;
exports.vv       = vv;
exports.register = register;
exports.test     = test;
exports.on2      = on2;
exports.read     = read;
exports.readN    = readN;
/*  Not a pure module */
