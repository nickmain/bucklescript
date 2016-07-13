

type t = 
  | Monday
  | Tuesday
  | SpecialDay of int 
  | A of int * int 
  | B of (int * int) 

  | D of t 
        [@@deriving bs.repr]
include (struct 
  let all_branches_of_t : Js_dyn.variant_shape  = 
    { constructors = 
        [|"Monday"; "Tuesday" ; "SpecialDay" |];
     arities = [| 0; 0; 1; 2 ; 1 |]
    }
  let rec _value_of_t  (value : t) :Js_dyn.value = 
    match value with 
    | Monday -> Js_dyn.value_of_variant all_branches_of_t 0 [||]
    | Tuesday -> Js_dyn.value_of_variant all_branches_of_t 1 [||]
    | SpecialDay v 
      -> 
      Js_dyn.value_of_variant all_branches_of_t 2  
        [| Js_dyn.value_of_int v [@bs] |]
    | A (x,y) 
      ->
      Js_dyn.value_of_variant all_branches_of_t 3 
        [| Js_dyn.value_of_int x [@bs] ;
           Js_dyn.value_of_int y [@bs] |]      
    | B z
      -> Js_dyn.value_of_variant all_branches_of_t 4 
           [| 
             Js_dyn.value_of_tuple_2
               Js_dyn.value_of_int
               Js_dyn.value_of_int  z 
           |]
    | D x -> 
      Js_dyn.value_of_variant all_branches_of_t 5
        [| _value_of_t x |]
  let value_of_t : t Js_dyn.to_value = 
    fun [@bs] v -> _value_of_t v 
end : sig 
  val value_of_t : t Js_dyn.to_value [@bs]
end)

type u = 
  { x : int ; y : t ; z : string ; u : int option}
    [@@deriving bs.repr]
include (struct 
  let all_fields_of_t : Js_dyn.record_shape = 
    { labels = [| "x"; "y"; "z" |] }
  let value_of_u : u Js_dyn.to_value  = 
    fun [@bs] (value : u) 
      -> 
        match value with 
        | { x ; y ; z } -> 
          Js_dyn.value_of_record all_fields_of_t
            [| Js_dyn.value_of_int  x [@bs] ; 
               value_of_t y [@bs] ;
               Js_dyn.value_of_string z [@bs] |]
end : sig 
  val value_of_u : u Js_dyn.to_value 
end)
