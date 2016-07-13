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
val value_of_int32 : int32 to_value
val value_of_int64 : int64 to_value
val value_of_int : int to_value
val value_of_nativeint : nativeint to_value 
val value_of_bool : bool to_value
val value_of_float : float to_value
val value_of_char : char to_value
val value_of_string : string to_value

(** Make sure [value_of*] below are  always fully applied *)
val value_of_array : 'a to_value -> 'a array -> value
val value_of_list : 'a to_value  -> 'a list -> value
val value_of_record : record_shape  -> value im_array -> value
val value_of_variant : variant_shape -> int -> value im_array -> value

val value_of_option : 'a to_value -> 'a option -> value

val value_of_tuple_2 : 
  'a to_value ->
  'b to_value ->
  'a * 'b ->
  value
val value_of_tuple_3 : 
  'a to_value ->
  'b to_value ->
  'c to_value ->
  'a * 'b * 'c -> value 

val value_of_tuple_4 : 
  'a to_value ->
  'b to_value -> 
  'c to_value ->
  'd to_value -> 
  'a * 'b * 'c * 'd -> value 

val value_of_tuple_5 : 
  'a0 to_value -> 
  'a1 to_value -> 
  'a2 to_value -> 
  'a3 to_value -> 
  'a4 to_value -> 
  'a0 * 'a1 * 'a2 * 'a3 * 'a4 -> value 

val value_of_tuple_6 : 
  'a0 to_value -> 
  'a1 to_value -> 
  'a2 to_value -> 
  'a3 to_value -> 
  'a4 to_value -> 
  'a5 to_value -> 
  'a0 * 'a1 * 'a2 * 'a3 * 'a4 * 'a5 -> value 

