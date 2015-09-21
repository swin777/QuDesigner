define(["dojo/_base/declare",
        "dijit/layout/ContentPane",
        "ashDrawEx/ExCanvas",
        "ashDraw/io/json/Reader",
        "dojo/json"], function(declare, ContentPane, ExCanvas, Reader, json){
	return declare("app.center.Monitor", ContentPane, {
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
			var params = me.getUrlVars();
			if(params.actId){
				me.getContent(params.actId);
			}
		},
		
		openCanvas:function(){
			var me = this;
			me.canvas = new ExCanvas(me.domNode.id + "_dgn");
			me.canvas.figureDragAble = false;
			me.canvas.setGrid(false);
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
		},
		
		getContent:function(id){
			var me = this;
    		dojo.xhr.get({
	    		url: app.application.config.businessServer+"/getContent?id="+id,
	    		handleAs: "json",
	    		load: function(result) {
	    			if(result && result.attributes && result.design){
	    				var design = result.design;
	    				var attrContent;
	    				var info = {};
	    				
	    				attrContent = result.attributes;
	    				
	    				info.title = attrContent.actInfo.TITLE;
	    				info.diagramContent = json.stringify(design);
	    				info.attrContent = attrContent;
	    				
	    				me.info = info;
	    				me.openCanvas();
	    			}
	    		}
    		});
		},
		
		getUrlVars:function() {
		    var vars = {};
		    var url = window.location.href;
		    url = decodeURIComponent(url);
		    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		        vars[key] = value;
		    });
		    return vars;
		}
	});
});