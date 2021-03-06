define(["dojo/_base/declare",
        "dijit/layout/AccordionContainer",
        "dijit/layout/ContentPane",
        "dojox/grid/DataGrid", 
        "dojox/grid/cells", 
        "dojox/grid/cells/dijit",
        "dojo/store/Memory",
        "dojo/data/ItemFileWriteStore",
        "dijit/form/Button",
        "app/right/MissionEdit",
        "app/right/QwestEdit",
        "app/right/ActEdit",
        "app/right/ConnectionEdit",
        "ashDraw/util/UUID"], function(declare, AccordionContainer, 
        		ContentPane, DataGrid, cells, cellsDijit, Memory, ItemFileWriteStore, Button, MissionEdit, QwestEdit, ActEdit, ConnectionEdit){
	return declare("app.right.PropertyView", AccordionContainer, {
		contentPane:null,
		grid:null,
		data:[],
		figure:null,
		missionEdit:null,
		qwestEdit:null,
		actEdit:null,
		connectionEdit:null,
		
		constructor: function() {
			var me = this;		
			me.region = "top";
			QuDesigner.app.eventbus.addEventListener('addcanvas', function(quCanvas) {
				quCanvas.addSelectionListener(this);
				quCanvas.getCommandStack().addEventListener(this);
				if(!quCanvas.attrContent){
					quCanvas.attrContent = {};
				}
				if(!quCanvas.attrContent.actInfo){
					quCanvas.attrContent.actInfo = {QUESTACTID:ashDraw.util.UUID.create()};
				}
			}, this);
		},
		
		startup:function(){
			var me = this;		
			this.inherited(arguments);
			var winHeight = $(window).height();
			me.contentPane = new ContentPane({align:"right", title:'property', style:'height:'+(winHeight-310)+'px; padding:0px;'});
			me.addChild(me.contentPane);
			
			var myButton = new Button({
		        label: "속성편집",
		        onClick: function(evt){
		        	if(me.figure){
		        		var attrs = me.figure.getPersistentAttributes();
		        		if(attrs.type=='ashDrawEx.shape.node.basic.Group'){
		        			if(!me.qwestEdit){
				        		me.qwestEdit = new QwestEdit();
				        	}
		        			me.qwestEdit.editStart(me.figure);
			        	}else if(attrs.type=='ashDraw.Connection'){
			        		if(!me.connectionEdit){
				        		me.connectionEdit = new ConnectionEdit();
				        	}
		        			me.connectionEdit.editStart(me.figure);
			        	}else{
			        		if(!me.missionEdit){
				        		me.missionEdit = new MissionEdit();
				        	}
		        			me.missionEdit.editStart(me.figure);
			        	}
		        	}else{
		        		if(!me.actEdit){
			        		me.actEdit = new ActEdit();
			        	}
		        		me.actEdit.editStart();
		        	}
		        }
		    })
			me.contentPane.addChild(myButton);
			
			var gridLayout = [{
				defaultCell: { width: 8, editable: true, type: cells._Widget, styles: 'text-align: right;'},
				cells: [
					{ name: 'Name', field: 'name', styles: '', editable: false, width:'50%'},
					{ name: 'Value', field: 'value', styles: '', editable: true, width:'50%'},
				]
			}];
			me.data = {
				      //identifier: "name",
				      items: []
				    };
			me.grid = new DataGrid({
				store: new ItemFileWriteStore({data: me.data}),
				structure: gridLayout,
				escapeHTMLInData: false,
				rowHeight:25,
				height:'90%'
			}, "grid");
			me.contentPane.addChild(me.grid);
			me.grid.on("applyCellEdit", function(inValue, inRowIndex, inFieldIndex){
				var item = me.data.items[inRowIndex];
				var attr = me.figure.getPersistentAttributes();
				var recordId = item.name;
				
				if(attr[item.name] != inValue) {
					var quCanvas = QuDesigner.app.currentCanvas();
					if("x"==recordId){
						var command = new ashDraw.command.CommandMove(me.figure);
						command.setPosition(inValue, attr.y);
						quCanvas.getCommandStack().execute(command);
					}else if("y"==recordId){
						var command = new ashDraw.command.CommandMove(me.figure);
						command.setPosition(attr.x, inValue);
						quCanvas.getCommandStack().execute(command);
					}else if("width"==recordId){
						var command = new ashDraw.command.CommandResize(me.figure);
						command.setDimension(inValue, attr.height);
						quCanvas.getCommandStack().execute(command);
					}else if("height"==recordId){
						var command = new ashDraw.command.CommandResize(me.figure);
						command.setDimension(attr.width, inValue);
						quCanvas.getCommandStack().execute(command);
					}else if("label"==recordId){
						var command = new ashDraw.command.CommandReLabel(me.figure);
						command.setLabel(inValue);
						quCanvas.getCommandStack().execute(command);
					}
					quCanvas.setCurrentSelection(me.figure);
				}
			});
		},
		
		stackChanged : function(event) {
			var me = this;
			if(event.isPreChangeEvent())
				return;
			var figure = event.command.figure;
			var connection = event.command.connection;
			if(event.command.con){
				connection = event.command.con;
			}
			
			var obj = null;
			if(figure){
				obj = figure;
			}else if(!figure && connection){
				obj = connection;
			}
			
			if(obj && event.command.canvas && event.command.canvas.attrContent && !event.command.canvas.attrContent[obj.id]){
				event.command.canvas.attrContent[obj.id] = {};
				if(obj instanceof ashDrawEx.shape.node.basic.Group){
					event.command.canvas.attrContent[obj.id]['_type_'] = 'qwest';
				}else if(obj instanceof ashDraw.Connection){
					event.command.canvas.attrContent[obj.id]['_type_'] = 'connect';
					if(obj.sourcePort.parent instanceof ashDrawEx.shape.node.basic.Group){
						event.command.canvas.attrContent[obj.id]['_type_'] = 'qwestConnect';
					}else{
						event.command.canvas.attrContent[obj.id]['_type_'] = 'missionConnect';
					}
					event.command.canvas.attrContent[obj.id]['source'] = obj.sourcePort.parent.id;
					event.command.canvas.attrContent[obj.id]['target'] = obj.targetPort.parent.id;
				}else{
					event.command.canvas.attrContent[obj.id]['_type_'] = 'mission';
					event.command.canvas.attrContent[obj.id]['QUESTID'] = obj.gId;
				}
			}
			
			if(obj && event.command.canvas && event.command.canvas.attrContent && !event.command.canvas.getFigure(obj.id) && !event.command.canvas.getLine(obj.id)){
				delete event.command.canvas.attrContent[obj.id]
			}
			
			if(obj && event.command.newSourcePort){
				var source = event.command.newSourcePort.parent;
				var target = event.command.newTargetPort.parent;
				if(source instanceof ashDrawEx.shape.node.basic.Group){
					event.command.canvas.attrContent[obj.id]['_type_'] = 'qwestConnect';
				}else{
					event.command.canvas.attrContent[obj.id]['_type_'] = 'missionConnect';
				}
				event.command.canvas.attrContent[obj.id]['source'] = source.id;
				event.command.canvas.attrContent[obj.id]['target'] = target.id;
			}
			
			if(typeof figureArr == 'undefined') {
				if(figure === null || typeof figure == "undefined") {
					me.gridReload(null);
				} else {
					var totalAttrs = [];
					var quCanvas = QuDesigner.app.currentCanvas();
					var metaInfo = quCanvas.attrContent[figure.id];
					var attrs = figure.getPersistentAttributes();
					
					for(var member in metaInfo){
						if(member!='_type_'){
							totalAttrs[member] = metaInfo[member];
						}
					}
					for(var member in attrs){
						if(member!='type'){
							totalAttrs[member] = attrs[member];
						}
					}
					
					me.gridReload(totalAttrs);
					me.figure = figure;
				}
			}
		},
		
		onSelectionChanged : function(figure, figureArr) {
			var me = this;
			if(typeof figureArr == 'undefined') {
				if(figure === null || typeof figure == "undefined") {
					me.gridReload(null);
					me.figure = null;
				} else {
					var totalAttrs = [];
					var quCanvas = QuDesigner.app.currentCanvas();
					var metaInfo = quCanvas.attrContent[figure.id];
					var attrs = figure.getPersistentAttributes();
					
					for(var member in metaInfo){
						totalAttrs[member] = metaInfo[member];
					}
					for(var member in attrs){
						totalAttrs[member] = attrs[member];
					}
					
					me.gridReload(totalAttrs);
					me.figure = figure;
				}
			}
		},
		
		gridReload:function(attrs){
			var me = this;
			var delItems = [];
			for(var i=0; i<me.data.items.length; i++){
				delItems.push(me.data.items[i])
			}
			for(var i=0; i<delItems.length; i++){
				me.grid.store.deleteItem(delItems[i])
			}
			if(attrs){
				for(var member in attrs){
					if(member=='label' || member=='gLabel'){
						continue;
					}
					var value = '';
					if(attrs[member]){
						value = attrs[member];
					}
					me.grid.store.newItem({name:member, value:value});
				}
				for(var i=0; i<4; i++){
					me.grid.store.newItem({name:'', value:''});
				}
			}
		}
	});
});