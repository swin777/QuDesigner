define(["dojo/_base/declare",
        "dijit/_Widget"], function(declare, _Widget){
	return declare("app.left.notation.NotationNode", _Widget, {
		contentPane:null,
		nodeInfo:null,
		
		constructor: function(nodeInfo) {
			this.nodeInfo = nodeInfo;
		},
		
		startup:function(){
			var me = this;		
			this.inherited(arguments);
			var div = "<div data-type='Node' data-shape='" + this.nodeInfo.cls_name + "' data-node-id='" + this.nodeInfo.id + "' class='navigation palette_node_element ashDraw_droppable'>";
			div += this.nodeInfo.name;
			div += "</div>";
			$('#'+me.domNode.id).append(div);
		}
	});
});