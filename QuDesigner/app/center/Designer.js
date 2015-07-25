define(["dojo/_base/declare",
        "dijit/layout/ContentPane",
        "ashDrawEx/ExCanvas",
        "ashDraw/io/json/Reader",
        "dojo/json"], function(declare, ContentPane, ExCanvas, Reader, json){
	return declare("app.center.Designer", ContentPane, {
		canvas:null,
		info:null,
		
		"-chains-": {
	        constructor: "manual"
	    },
	    
		constructor: function(info) {
			var me = this;
			me.closable = true;
			me.info = info;
			me.style = "overflow:auto; padding:0px; position: relative;";
		},
		
		startup:function(){
			var me = this;		
			me.inherited(arguments);
			$('#'+me.domNode.id).append("<div id='" + me.domNode.id + "_dgn' class='canvas' style='width:1500px; height:1500px;-webkit-tap-highlight-color: rgba(0,0,0,0);'></div>")
			me.canvas = new ExCanvas(me.domNode.id + "_dgn");
			if(!me.info.attrContent) {
				me.info.attrContent = {};
			}
			me.canvas.attrContent = me.info.attrContent;
			if(me.info.diagramContent) {
				var reader = new Reader();		
				reader.unmarshal(me.canvas, json.parse(me.info.diagramContent));
			}
			QuDesigner.app.eventbus.dispatch('addcanvas', me.canvas);
			QuDesigner.app.eventbus.addEventListener('palleteLoad', function() {
				me.canvas.reDragAbleReg();
			}, me);
			QuDesigner.app.eventbus.dispatch('changecanvas', me.canvas);
			me.canvas.setGrid(true);
		}
	});
});