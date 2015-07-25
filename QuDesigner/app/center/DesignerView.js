define(["dojo/_base/declare",
        "dijit/layout/TabContainer",
        "app/center/Designer"], function(declare, TabContainer, Designer){
	return declare("app.center.DesignerView", TabContainer, {
		constructor: function() {
			var me = this;	
			me.watch("selectedChildWidget", function(name, oval, nval){
				QuDesigner.app.eventbus.dispatch('changecanvas', nval.canvas);
			});
		},
		
		postCreate:function(){
			var me = this;		
			this.inherited(arguments);
			var designer = new Designer({title:'New', selected:true});
			me.addChild(designer);
		},
		
		addCanvas:function(){
			var me = this;
			var designer = new Designer({title:'New', selected:true});
			me.addChild(designer);
			me.selectChild(designer);
			
		},
		
		openCanvas:function(info){
			var me = this;
			var designer = new Designer({title:info.title, selected:true, diagramContent:info.diagramContent, attrContent:info.attrContent});
			me.addChild(designer);
			me.selectChild(designer);
		}
	});
});