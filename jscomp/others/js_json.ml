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

type t


type _ kind = 
  | String : Js_string.t kind
  | Number : float kind 
  | Object : t Js_dict.t kind 
  | Array : t array kind 
  | Boolean : Js.boolean kind
  | Null : Js_types.null_val kind

let reify_type (type a) (x : 'a) : (a kind * a ) = 
  if Js.typeof x = "string" then 
    (Obj.magic String, Obj.magic x) else
  if Js.typeof x = "number" then 
    (Obj.magic Number, Obj.magic x ) else 
  if Js.typeof x = "boolean" then (* which one is faster, save [Js.typeof] or not *)
    (Obj.magic Boolean, Obj.magic x) else
  if (Obj.magic x) == Js.null then  (* providing a universal function *)
    (Obj.magic Null, Obj.magic x) else 
  if Js.to_bool @@ Js_array.isArray x  then 
    (Obj.magic Array, Obj.magic x ) 
  else 
    (Obj.magic Object, Obj.magic x )

let test (type a) (x : 'a) (v : a kind) : bool =
  match v with
  | Number -> Js.typeof x = "number"
  | Boolean 
    -> 
     Js.typeof x = "boolean" 
  | String -> Js.typeof x = "string"
  | Null -> (Obj.magic x) == Js.null 
  | Array -> Js.to_bool (Js_array.isArray x )
  | Object -> (Obj.magic x) != Js.null && Js.typeof x = "object" && not (Js.to_bool (Js_array.isArray x ))


external parse : string -> t = "JSON.parse" [@@bs.val]
(* TODO: more docs when parse error happens or stringify non-stringfy value *)
