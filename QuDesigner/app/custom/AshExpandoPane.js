define(["dojo/_base/declare",
        "dojox/layout/ExpandoPane"], function(declare, ExpandoPane){
	return declare("app.custom.AshExpandoPane", ExpandoPane, {
		collseDom:null,
		meDom:null,
		
		constructor: function() {
			var me = this;		
		},
		
		startup:function(){
			var me = this;		
			me.inherited(arguments);
			me.meDom = $('#'+me.domNode.id);
			var height = me.meDom.height();
			$('body').append(
				'<div id=' + me.domNode.id + '_collse>' +
				'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="'+height+'" id="ext-gen1270" style="width: 25px; height: '+height+'px;" viewBox="12.546875 -20.296875 15 690"><defs></defs><rect width="100%" height="100%" fill="#000" stroke="none" opacity="0" id="ext-gen1271"></rect><text id="ext-sprite-1269" zIndex="0" width="25" text="'+me.title+'" font-family="tahoma, arial, verdana, sans-serif" font-weight="bold" font-size="11px" fill="rgb(4, 64, 140)" x="0" y="0" text-anchor="start" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" transform="matrix(0,1,-1,0,17.7969,-20.2969)"><tspan x="0" dy="3.25">'+me.title+'</tspan></text></svg>' +
				'</div>'
			);
			me.collseDom = $('#'+me.domNode.id + '_collse')
			if(me.region=='left'){
				me.collseDom.css({'height':height, 'width':25, 'z-index':4,
					   'position': 'absolute', 'display':'none'})
			}else if(me.region=='right'){
				me.collseDom.css({'height':height, 'width':25, 'z-index':4, 'right':0, 
					   'position': 'absolute', 'display':'none'})
			}
		},	
		
		toggle:function(){
			var me = this;		
			me.inherited(arguments);
			var top = parseInt($('#'+me.domNode.id).css('top'))+22;
			me.collseDom.css({'top':top})
			if(me._showing){
				me.collseDom.css({'display':'none'})
			}else{
				me.collseDom.css({'display':'block'})
			}
		}
	});
});