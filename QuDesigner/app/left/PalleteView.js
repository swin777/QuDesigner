define(["dojo/_base/declare",
        "dijit/layout/AccordionContainer",
        "dojox/layout/TableContainer",
        "app/left/notation/NotationNode"], function(declare, AccordionContainer, TableContainer, NotationNode){
	return declare("app.left.PalleteView", AccordionContainer, {
		TableContainer:null,
		
		constructor: function() {
			var me = this;		
			me.region = "top";
		},
		
		postCreate:function(){
			var me = this;		
			this.inherited(arguments);
			var winHeight = $(window).height();
			me.TableContainer = new TableContainer({cols:3, title:'pallete', style:'height:'+(winHeight-355)+'px; width:280px; padding:0px;'});
			me.addChild(me.TableContainer);
			me.initPallate();
		},
		
		setColumns : function () {
		       this.inherited (arguments);
		       this.resize ();
		     },
		
		initPallate:function(){
			var me = this;	
			me.TableContainer.addChild(new NotationNode({id :'basic_start', name : 'Start', cls_name : 'ashDraw.shape.node.Start', node_type : 'Node'}));
			me.TableContainer.addChild(new NotationNode({id :'basic_end', name : 'End', cls_name : 'ashDraw.shape.node.End', node_type : 'Node'}));
			me.TableContainer.addChild(new NotationNode({id :'basic_rectangle', name : 'Rectangle', cls_name : 'ashDrawEx.shape.node.basic.Rectangle', node_type : 'Node'}));
			
			me.TableContainer.addChild(new NotationNode({id :'basic_circle', name : 'Circle', cls_name : 'ashDrawEx.shape.node.basic.Circle', node_type : 'Node'}));
			me.TableContainer.addChild(new NotationNode({id :'basic_oval', name : 'Oval', cls_name : 'ashDrawEx.shape.node.basic.Oval', node_type : 'Node'}));
			me.TableContainer.addChild(new NotationNode({id :'basic_diamond', name : 'Diamond', cls_name : 'ashDrawEx.shape.node.basic.Diamond', node_type : 'Node'}));
			
			me.TableContainer.addChild(new NotationNode({id :'basic_label', name : 'Label', cls_name : 'ashDrawEx.shape.node.basic.Label', node_type : 'Node'}));
			me.TableContainer.addChild(new NotationNode({id :'basic_image', name : 'Image', cls_name : 'ashDrawEx.shape.node.basic.Image', node_type : 'Node'}));
			me.TableContainer.addChild(new NotationNode({id :'basic_group', name : 'Group', cls_name : 'ashDrawEx.shape.node.basic.Group', node_type : 'Node'}));
		}
	});
});