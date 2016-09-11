(* Copyright (C) 2015-2016 Bloomberg Finance L.P.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * In addition to the permissions granted to you by the LGPL, you may combine
 * or link a "work that uses the Library" with a publicly distributed version
 * of this file to produce a combined library or application, then distribute
 * that combined work under the terms of your choosing, with no requirement
 * to comply with the obligations normally placed on you by section 4 of the
 * LGPL version 3 (or the corresponding section of a later version of the LGPL
 * should you choose to use a later version).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA. *)

(** This module will  be exported


    - It does not have any code, all its code will be inlined so that
       there will be never
       {[ require('js')]}

    - Its interface should be minimal

*)

(** internal types for FFI, these types are not used by normal users *)
type (-'obj, +'a) meth_callback
type (-'arg, + 'result) meth
type (-'arg, + 'result) fn (** Js uncurried function *)


(** Types for JS objects *)
(* tag::public_js_types[]*)
type +'a t
(** Js object type *)
type + 'a null
(** nullable, value of this type can be either [null] or ['a]
    this type is the same as {!Js.Null.t}  *)
type + 'a undefined
(** value of this type can be either [undefined] or ['a]
    this type is the same as {!Js.Undefined.t}  *)
type + 'a null_undefined
(** value of this type can be [undefined], [null] or ['a]
    this type is the same as {!Js.Null_undefined.t}*)
type boolean
(* end::public_js_types[]*)

(* tag::nested_built_in_modules[] *)
(** {3 nested modules}*)
module Null = Js_null
module Undefined = Js_undefined
module Null_undefined = Js_null_undefined
(* end::nested_built_in_modules[] *)


(* tag::predefined_js_values[]*)
external true_ : boolean = "true" [@@bs.val]
external false_ : boolean = "false" [@@bs.val]
external null : 'a null = ""
[@@bs.val] (* The same as {!Js.Null.empty} will be compiled as [null]*)
external undefined : 'a undefined = ""
[@@bs.val] (* The same as  {!Js.Undefined.empty} will be compiled as [undefined]*)
(* end::predefined_js_values[]*)

(* tag::utility_functions[]*)
external to_bool : boolean -> bool = "js_boolean_to_bool"
(** convert Js boolean to OCaml bool *)
external typeof : 'a -> string = "js_typeof"
(** [typeof x] will be compiled as [typeof x] in JS *)
external log : 'a -> unit = "js_dump"
(** A convenience function to log *)

(** {4 operators }*)
external unsafe_lt : 'a -> 'a -> boolean = "js_unsafe_lt"
(**  [unsafe_lt a b] will be compiled as [a < b] *)
external unsafe_le : 'a -> 'a -> boolean = "js_unsafe_le"
(**  [unsafe_le a b] will be compiled as [a <= b] *)
external unsafe_gt : 'a -> 'a -> boolean = "js_unsafe_gt"
(**  [unsafe_gt a b] will be compiled as [a > b] *)
external unsafe_ge : 'a -> 'a -> boolean = "js_unsafe_ge"
(**  [unsafe_ge a b] will be compiled as [a >= b] *)
(* end::utility_functions[]*)

(** {4 nested modules} *experimental* API, please refer to
  {!Js_dict} {!Js_array} {!Js_string} {!Js_re} for more details *)
module Dict = Js_dict
module Array = Js_array
module String = Js_string
module Re = Js_re
module Types = Js_types
module Json = Js_json
