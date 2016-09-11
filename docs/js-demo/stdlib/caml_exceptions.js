'use strict';
define(["exports"],
  function(exports){
    'use strict';
    var id = [0];
    
    function caml_set_oo_id(b) {
      b[1] = id[0];
      id[0] += 1;
      return b;
    }
    
    function get_id() {
      id[0] += 1;
      return id[0];
    }
    
    function create(str) {
      var v_001 = get_id(/* () */0);
      var v = /* tuple */[
        str,
        v_001
      ];
      v.tag = 248;
      return v;
    }
    
    exports.caml_set_oo_id = caml_set_oo_id;
    exports.get_id         = get_id;
    exports.create         = create;
    
  })
/* No side effect */
