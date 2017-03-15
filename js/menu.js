'use strict';

(function(exports){


  /* Default basename for Ids and Classes in html */
  var MMMname = 'MMMenu' ;



  var MMMenuClass = function(options){

    /*  for all Menus */
    var MMMenu = [];

    options = options || {};
    MMMname = options['name']|| MMMname;

    var menus = document.getElementsByClassName(MMMname);


    /* Class for a single accordeon menu*/
    var DropFuncClass = function (id,options) {
      this.id = id;

      //if(id > 9){throw 'MMMenu accept 10 submenus maximum'; }

      var _ele, _caret;

      options = options || {};
      var _cascade = options['cascade'] || true ,
	  _upSymbol = options['upSymbol'] || '-' ,
	  _downSymbol = options['downSymbol'] || '+',
	  _name = options['name']|| MMMname
      ;


      var _closingDiv_id = _name +'_div_' + id,
	  _title_id = _name +'_a_' + id,
	  button_id = _name +'_caret_' + id;

      var _memId = _closingDiv_id+'_status',
	  _status = localStorage.getItem(_memId)
      ;

      _status = (_status==='open') ? 'open' :'closed';

      _ele = document.getElementById(_closingDiv_id);

      var that = this;

      this.init = function(){
	_ele.style.display = 'none';
	document.getElementById(_title_id).onclick = that.flipmenu;
	_caret = document.getElementById(button_id);
	_caret.innerHTML = _downSymbol;

	if(_status==='open'){that.open(); }

	return this;
      };

      this.close = function (waittime) {
	waittime = waittime | 0;
	setTimeout(
	  function(){
	    _caret.innerHTML = _downSymbol;
	    _ele.style.display = 'none';

	  }, waittime);
	if(_cascade){
      	  var childs = _ele.getElementsByClassName(_name);
      	  for(var ii=0; ii<childs.length; ii++){
      	    var locid = childs[ii].id;
      	    MMMenu[locid[locid.length-1]].close();
      	  }
	}
	_status = 'closed';
      };

      this.open =function (waittime) {
	waittime = waittime | 0;
	setTimeout(
	  function(){
	    _caret.innerHTML = _upSymbol;
	    _ele.style.display = 'block';
	  },waittime);
	_status = 'open';
      };

      this.flipmenu = function(){
	(_status==='closed') ? that.open() : that.close();
	localStorage.setItem(_memId, _status);
      };
      return this;
    };



    for(var imenu=0;imenu<menus.length;imenu++){
      menus[imenu].id = MMMname + '_main_' + imenu;

      var menu_parts = menus[imenu].children;
      for (var i = 0; i < menu_parts.length; i++) {
	var locpart = menu_parts[i];

	switch (menu_parts[i].tagName) {
	case 'A':
	  locpart.id = MMMname + '_a_' + imenu;
	  locpart.className = locpart.className + ' '+MMMname+'Title';
	  var idc = locpart.getElementsByTagName('I').length - 1;
	  var caret = locpart.getElementsByTagName('I')[idc];
	  caret.id = MMMname + '_caret_' + imenu;
	  caret.className = caret.className + ' '+MMMname+'Caret';
	  break;
	case 'DIV':
	  locpart.id = MMMname + '_div_' + imenu;
	  locpart.className = locpart.className + ' '+MMMname+'Div';
	  break;
	default:
	  console.log('oulala!');
	}
      }
      MMMenu.push(new DropFuncClass(imenu,options).init());
    }

    return this;

  };
  /* Exported fuctions */
  exports.MMMenuClass = MMMenuClass;

  /* To export for debug */
  // exports.DropFuncClass = DropFuncClass;
  // exports.MMMenu = MMMenu;

})(this.MMMenuLib = {});
