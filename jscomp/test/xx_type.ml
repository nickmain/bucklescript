 module J =
        struct
          external unsafe_expr :
          ('a0 -> 'a1) -> ([ `Arity_1 of 'a0 ],'a1) Js.fn =
      "js_fn_mk" "1"
      end 

 module JJ =
                    struct
                      external unsafe_expr :
                      ([ `Arity_1 of 'a0 ],'a1) Js.fn ->
                  'a0 -> 'a1 = "js_fn_run" "1"
  end 
type t =
  | Monday
  | Tuesday
  | SpecialDay of int
  | A of int* int
  | B of (int* int)
  | D of t
        [@@deriving bs.repr]
include
    (struct
      let all_branches_of_t: Js_dyn.variant_shape =
    ([|"Monday";"Tuesday";"SpecialDay"|], [|0;0;1;2;1|])
      let rec value_of_t: t Js_dyn.to_value =
        J.unsafe_expr
           (fun (value : t)  ->
           match value with
             | Monday  ->
           Js_dyn.value_of_variant all_branches_of_t 0 [||]
             | Tuesday  ->
           Js_dyn.value_of_variant all_branches_of_t 1 [||]
             | SpecialDay v ->
               Js_dyn.value_of_variant all_branches_of_t 2
                  [|((let module J =
                    struct
                      external unsafe_expr :
                      ([ `Arity_1 of 'a0 ],'a1) Js.fn ->
                  'a0 -> 'a1 = "js_fn_run" "1"
           end in J.unsafe_expr Js_dyn.value_of_int v))|]
             | A (x,y) ->
               Js_dyn.value_of_variant all_branches_of_t 3
                  [|((let module J =
                    struct
                      external unsafe_expr :
                      ([ `Arity_1 of 'a0 ],'a1) Js.fn ->
                  'a0 -> 'a1 = "js_fn_run" "1"
                   end in J.unsafe_expr Js_dyn.value_of_int x));((
                   let module J =
                     struct
                       external unsafe_expr :
                       ([ `Arity_1 of 'a0 ],'a1) Js.fn ->
                   'a0 -> 'a1 = "js_fn_run" "1"
           end in J.unsafe_expr Js_dyn.value_of_int y))|]
             | B z ->
               Js_dyn.value_of_variant all_branches_of_t 4
                    [|(Js_dyn.value_of_tuple_2 Js_dyn.value_of_int
           Js_dyn.value_of_int z)|]
             | D x ->
               Js_dyn.value_of_variant all_branches_of_t 5
                  [|(( JJ.unsafe_expr value_of_t x))|])
  end :
sig val value_of_t : ([ `Arity_1 of t ],Js_dyn.value) Js.fn end)
