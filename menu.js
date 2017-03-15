"use strict";

(function(exports){
  var list_container = [];

  function MMMenu_init(){
    list_container = document.getElementsByClassName("MMMenu-container");


    console.log("init",list_container.length);
  };


  exports.init = MMMenu_init;

})(this.MMMenu = {});


/* Class for accordeon menu*/
function DropFuncClass(id,idonclick,idcaret,options) {
  var _memId = id+'_status',
      _status = localStorage.getItem(_memId);

  var _ele, _caret;

  if(options){
    var _son = options['son'],
	_opposite = options['opposite'];
  }


  _status = (_status==='open') ? 'open' :'closed';

  var that = this;
  this.init = function(){
    _ele = document.getElementById(id);
    document.getElementById(idonclick).onclick = that.flipmenu;
    _caret = document.getElementById(idcaret);

    if(_status==='open'){ that.open();}

    // var dropmenudict = JSON.parse(localStorage.getItem("dropmenudict"));
    // dropmenudict = dropmenudict || {};
    // dropmenudict[_memId] = true;
    // console.log(dropmenudict)
    // localStorage.setItem("dropmenudict",JSON.stringify(dropmenudict));
  };

  this.close = function (waittime) {
    waittime = waittime | 0;
    setTimeout(
      function(){
	// _ele.style.visibility = 'hidden';
	_caret.className = _caret.className.replace("caret-up","caret-down");
	_ele.style.display = 'none';
      }, waittime);
    if(_son){_son.close(0);}
    _status = 'closed';
  };

  this.open =function (waittime) {
    waittime = waittime | 0;
    setTimeout(
      function(){
	// _ele.style.visibility = 'visible';
	_caret.className = _caret.className.replace("caret-down","caret-up");
	_ele.style.display = 'block';
      },waittime);
    if(_opposite){_opposite.close(0);}
    _status = 'open';
  };


  this.flipmenu = function(){
    if(_status==='closed'){
      that.open();
    } else {
      that.close();
    }
    localStorage.setItem(_memId, _status);

  };
}
