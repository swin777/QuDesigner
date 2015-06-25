define(["dojo/_base/declare"], function(declare){
	var UUID =  declare("ashDraw.util.UUID", null, {	
	});
	
	UUID.create=function(){
	  var segment=function(){
	     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	  };
	  return (segment()+segment()+"-"+segment()+"-"+segment()+"-"+segment()+"-"+segment()+segment()+segment());
	};
	return UUID;
});