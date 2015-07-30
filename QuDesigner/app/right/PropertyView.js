define(["dojo/_base/declare",
        "dijit/layout/AccordionContainer",
        "dijit/layout/ContentPane",
        "dojox/grid/DataGrid", 
        "dojox/grid/cells", 
        "dojox/grid/cells/dijit",
        "dojo/store/Memory",
        "dojo/data/ItemFileWriteStore",
        "dijit/form/Button",
        "app/right/MissionEdit"], function(declare, AccordionContainer, 
        		ContentPane, DataGrid, cells, cellsDijit, Memory, ItemFileWriteStore, Button, MissionEdit){
	return declare("app.right.PropertyView", AccordionContainer, {
		contentPane:null,
		grid:null,
		data:[],
		figure:null,
		missionEdit:null,
		
		constructor: function() {
			var me = this;		
			me.region = "top";
			QuDesigner.app.eventbus.addEventListener('addcanvas', function(quCanvas) {
				quCanvas.addSelectionListener(this);
				quCanvas.getCommandStack().addEventListener(this);
			}, this);
		},
		
		startup:function(){
			var me = this;		
			this.inherited(arguments);
			me.contentPane = new ContentPane({align:"right", title:'property', style:'padding:0px;'});
			me.addChild(me.contentPane);
			
			var myButton = new Button({
		        label: "속성편집",
		        onClick: function(evt){
		        	if(me.figure.type!='ashDrawEx.shape.node.basic.Group'{
	        			if(!me.missionEdit){
			        		me.missionEdit = new MissionEdit();
			        		me.missionEdit.editStart(me.figure);
			        	}else{
			        		me.missionEdit.editStart(me.figure);
			        	}
		        	}else{
		        		
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
			if(typeof figureArr == 'undefined') {
				if(figure === null || typeof figure == "undefined") {
					me.gridReload(null);
				} else {
					var attrs = figure.getPersistentAttributes();
					me.gridReload(attrs);
					me.figure = figure;
				}
			}
		},
		
		onSelectionChanged : function(figure, figureArr) {
			var me = this;
			if(typeof figureArr == 'undefined') {
				if(figure === null || typeof figure == "undefined") {
					me.gridReload(null);
				} else {
					var attrs = figure.getPersistentAttributes();
					me.gridReload(attrs);
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
					var value = '';
					if(attrs[member]){
						value = attrs[member];
					}
					me.grid.store.newItem({name:member, value:value});
				}
				me.grid.store.newItem({name:'', value:''});
				me.grid.store.newItem({name:'', value:''});
				me.grid.store.newItem({name:'', value:''});
			}
		}
	});
});