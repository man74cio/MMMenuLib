'use strict';

(function(exports){

  /* Containet for all Menus */
  var MMMenu = [];


  /* Base name for Ids and Classes in html */
  var MMMname = 'MMMenu',
      container_base = MMMname + '_main_',
      closingDiv_base = MMMname + '_div_',
      title_base = MMMname + '_a_',
      button_base = MMMname + '_caret_',
      upSymbol = '-',
      downSymbol = '+'

  ;

  var NameSet = function(name){
    MMMname = name,
    container_base = MMMname + '_main_',
    closingDiv_base = MMMname + '_div_',
    title_base = MMMname + '_a_',
    button_base = MMMname + '_caret_'
    ;
  };


  /* Class for a single accordeon menu*/
  var DropFuncClass = function (id,options) {
    this.id = id;

    //if(id > 9){throw 'MMMenu accept 10 submenus maximum'; }

    var closingDiv_id = closingDiv_base + id,
	title_id = title_base + id,
	button_id =  button_base + id;


    var _memId = closingDiv_id+'_status',
	_status = localStorage.getItem(_memId);

    var _ele, _caret, _cascade = true;


    if(options){
      _cascade = options['cascade'] | true;
    }

    _status = (_status==='open') ? 'open' :'closed';

    var that = this;

    this.init = function(){
      _ele = document.getElementById(closingDiv_id);
      _ele.style.display = 'none';
      document.getElementById(title_id).onclick = that.flipmenu;
      _caret = document.getElementById(button_id);
      _caret.innerHTML = downSymbol;
      if(_status==='open'){that.open(); }

      return this;
    };

    this.close = function (waittime) {
      waittime = waittime | 0;
      setTimeout(
	function(){
	  // _ele.style.visibility = 'hidden';
	  //_caret.className = _caret.className.replace(upSymbol,downSymbol);
	  _caret.innerHTML = downSymbol;
	  _ele.style.display = 'none';
	}, waittime);
      // if(_cascade){

      // 	var childs = document.getElementById(closingDiv_id).getElementsByClassName(MMMname);
      // 	for(var ii=0; ii<childs.length; ii++){
      // 	  var locid = childs[ii].id;
      // 	  MMMenu[locid[locid.length-1]].close();
      // 	}
      // }
      _status = 'closed';
    };

    this.open =function (waittime) {
      waittime = waittime | 0;
      setTimeout(
	function(){
	  // _ele.style.visibility = 'visible';
	  // _caret.className = _caret.className.replace(downSymbol,upSymbol);
	  _caret.innerHTML = upSymbol;
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



  var CreateMenus = function(options){
    for(var ii in options){
      switch(ii){
      case 'name':
	NameSet(options[ii]); break;
      case 'upSymbol':
	upSymbol = options[ii]; break;
      case 'downSymbol':
	downSymbol = options[ii]; break;
      }

    }

    var menus = document.getElementsByClassName(MMMname);

    for(var imenu=0;imenu<menus.length;imenu++){
      menus[imenu].id = container_base + imenu;

      var menu_parts = menus[imenu].children;
      for (var i = 0; i < menu_parts.length; i++) {
	var locpart = menu_parts[i];

	switch (menu_parts[i].tagName) {
	case 'A':
	  locpart.id = title_base + imenu;
	  locpart.className = locpart.className + ' '+MMMname+'Title';
	  var idc = locpart.getElementsByTagName('I').length - 1;
	  var caret = locpart.getElementsByTagName('I')[idc];
	  caret.id = button_base + imenu;
	  caret.className = caret.className + ' '+MMMname+'Caret';
	  break;
	case 'DIV':
	  locpart.id = closingDiv_base + imenu;
	  locpart.className = locpart.className + ' '+MMMname+'Div';
	  break;
	default:
	  console.log('oulala!');
	}
      }

      MMMenu.push(new DropFuncClass(imenu).init());
      console.log(MMMenu[imenu])
    }

  };


  /* Exported fuctions */
  exports.CreateMenus = CreateMenus;

  /* To export for debug */
  // exports.DropFuncClass = DropFuncClass;
  // exports.MMMenu = MMMenu;

  })(this.MMMenuLib = {});
