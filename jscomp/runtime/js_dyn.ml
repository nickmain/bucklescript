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

(** An experimentation of runtime types in OCaml,
    unstable API, only for internal use
*)

type 'a im_array = 'a array

type variant_shape = 
  { constructors : string im_array ;
    arities : int im_array
  }
type record_shape =
  { labels : string im_array }

type value = 
  | Int32 of  int32
  | Int64 of int64
  | Int of int 
  | Nativeint of nativeint 
  | Bool of bool 
  | Float of float 
  | Char of char 
  | String of string

  | OptionNone
  | OptionSome of value 

  | Tuple of value im_array
  | Array of value im_array
  | List of value im_array
  | Record of record_shape * value im_array
  | Variant of variant_shape * int * value im_array

type 'a to_value = 'a -> value [@bs]

(** It would be nice to [unbox] primitive types
    especially in JS backend
 *)
let value_of_int32  = fun [@bs] x ->  Int32 x
let value_of_int64  = fun [@bs] x ->  Int64 x 
let value_of_int =  fun [@bs] x -> Int x 
let value_of_nativeint = fun [@bs] x -> Nativeint x 
let value_of_bool = fun [@bs] x -> Bool x 
let value_of_float = fun [@bs] x -> Float x 
let value_of_char = fun [@bs] x -> Char x 
let value_of_string  = fun [@bs] x -> String x 

let array_map f a =
  let open Array in 
  let l = length a in
  if l = 0 then [||] else begin
    let r = Array.make l (f(unsafe_get a 0) [@bs]) in
    for i = 1 to l - 1 do
      Array.unsafe_set r i (f(unsafe_get a i) [@bs])
    done;
    r
  end

let value_of_array k x = 
  Array (array_map k x)


let value_of_list k x = 
  Array (array_map k (Array.of_list x ))

let value_of_record labels v =
  Record(labels, v)

let value_of_variant labels tag vs = 
  Variant (labels, tag,vs)  

let value_of_tuple_2 k0 k1 (x,y) = 
  Tuple [|k0 x [@bs]; k1 y [@bs] |]

let value_of_tuple_3 k0 k1 k2  (x,y,z) = 
  Tuple [|k0 x [@bs]; k1 y [@bs] ; k2 z [@bs]|]

let value_of_tuple_4 k0 k1 k2 k3 (a0,a1,a2,a3) = 
  Tuple [|k0 a0 [@bs]; 
          k1 a1 [@bs];
          k2 a2 [@bs];
          k3 a3 [@bs]
        |]
let value_of_tuple_5 k0 k1 k2 k3 k4 (a0,a1,a2,a3,a4) = 
  Tuple [|
    k0 a0 [@bs]; 
    k1 a1 [@bs];
    k2 a2 [@bs];
    k3 a3 [@bs];
    k4 a4 [@bs]
  |]

let value_of_tuple_6 k0 k1 k2 k3 k4 k5 (a0,a1,a2,a3, a4,a5) = 
  Tuple [|k0 a0 [@bs]; 
          k1 a1 [@bs];
          k2 a2 [@bs]; 
          k3 a3 [@bs];
          k4 a4 [@bs];
          k5 a5 [@bs]
        |]

let value_of_option k x = 
  match x with 
  | None  -> OptionNone
  | Some x -> OptionSome (k x [@bs])
