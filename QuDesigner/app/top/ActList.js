define(["dojo/_base/declare",
        "dijit/form/TextBox",
        "dijit/form/Button",
        "dijit/registry", 
        "dojo/parser", 
        "dijit/Dialog", 
        "dojox/grid/DataGrid", 
        "dojox/grid/cells", 
        "dojox/grid/cells/dijit",
        "dojo/data/ItemFileWriteStore",
        "dijit/layout/ContentPane",
        "dojo/json",
        "dojo/domReady!",
        "ashDraw/util/UUID"], function(declare, TextBox, Button, registry, parser, Dialog, DataGrid, cells, dijit, ItemFileWriteStore, ContentPane, json){
	return declare("app.top.ActList", Dialog, {
		html:'<div class="dijitDialogPaneContentArea">' +
			 '<div style="height:250px; padding:0 0 0 0" itemid="contentPane" data-dojo-type="dijit/layout/ContentPane"></div>' +
		     '</div>' +
		     ' <div class="dijitDialogPaneActionBar">' +
			 '	<button data-dojo-type="dijit/form/Button" type="button" itemid="open" nodata="true">열기</button>' +
			 '	<button data-dojo-type="dijit/form/Button" type="button" itemid="clone" nodata="true">복제</button>' +
			 '	<button data-dojo-type="dijit/form/Button" type="button" itemid="cancel" nodata="true">취소</button>' +
			 ' </div>',
			 
		constructor: function() {
			var me = this;
			me.title = 'Act 목록';
			me.style = "width:400px; height:400px";
			me.content = me.html;
		},
		
		
		initStatus: false,
		
		listStart:function(){
			var me = this;
			if(!me.initStatus){
				QuDesigner.app.getChildById(me, 'open').onClick = function(evt){
					var rows = me.grid.selection.getSelected();
					if(rows.length){
						me.getContent(rows[0].QUESTACTID);
					}
					me.hide();
		        }
				QuDesigner.app.getChildById(me, 'clone').onClick = function(evt){
					var rows = me.grid.selection.getSelected();
					if(rows.length){
						me.getContent(rows[0].QUESTACTID, true);
					}
					me.hide();
		        }
				QuDesigner.app.getChildById(me, 'cancel').onClick = function(evt){
					me.hide();
		        }
				
				var contentPane = QuDesigner.app.getChildById(me, 'contentPane');
				var gridLayout = [{
					defaultCell: { width: 8, editable: true, type: cells._Widget, styles: 'text-align: right;'},
					cells: [
					    { name: 'ID', field: 'QUESTACTID', styles: '', editable: false, width:'0', hidden:true},
						{ name: '이름', field: 'TITLE', styles: '', editable: false, width:'50%'},
						{ name: '설명', field: 'DESCRIPTION', styles: '', editable: false, width:'50%'},
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
					rowHeight:30
				}, "grid");
				contentPane.addChild(me.grid);
			}
			me.initStatus = true;
			me.show();
			me.getActList()
		},
		
		getActList:function(){
			var me = this;
			var delItems = [];
			for(var i=0; i<me.data.items.length; i++){
				delItems.push(me.data.items[i])
			}
			for(var i=0; i<delItems.length; i++){
				me.grid.store.deleteItem(delItems[i])
			}
			dojo.xhr.get({
        		url: app.application.config.businessServer+"/getActList",
        		handleAs: "json",
        		load: function(result) {
        			if(result){
        				for(var i=0; i<result.length; i++){
        					me.grid.store.newItem(result[i]);
        				}
        			}
        		}
			});
		},
		
		getContent:function(id, clone){
    		dojo.xhr.get({
	    		url: app.application.config.businessServer+"/getContent?id="+id,
	    		handleAs: "json",
	    		load: function(result) {
	    			if(result && result.attributes && result.design){
	    				var design = result.design;
	    				var attrContent;
	    				var info = {};
	    				
	    				if(clone){
	    					var sourceAttrContent = result.attributes;
	    					var newKey = {};
	    					for(var member in sourceAttrContent){
	    						newKey[member] = ashDraw.util.UUID.create();
	    					}
	    					
	    					attrContent = {};
	    					for(var member in sourceAttrContent){
	    						if(member=='actInfo'){
	    							attrContent['actInfo'] = sourceAttrContent['actInfo'];
	    							var QUESTACTID = ashDraw.util.UUID.create();
	    							attrContent['actInfo'].QUESTACTID = QUESTACTID;
	    							attrContent.actInfo.TITLE = attrContent.actInfo.TITLE + "_" + QUESTACTID;
	    						}else{
	    							var uuid = newKey[member];
	    							attrContent[uuid] = sourceAttrContent[member];
	    						}
	    					}
	    					for(var i=0; i<design.length; i++){
	    						var obj = design[i];
    							if(obj.id){
    								obj.id = newKey[obj.id];
    							}
    							if(obj.gId){
    								obj.gId = newKey[obj.gId];
    							}
    							if(obj.source){
    								obj.source.node = newKey[obj.source.node];
    							}
    							if(obj.target){
    								obj.target.node = newKey[obj.target.node];
    							}
    						}
	    				}else{
		    				attrContent = result.attributes;
	    				}
	    				
	    				info.title = attrContent.actInfo.TITLE;
	    				info.diagramContent = json.stringify(design);
	    				info.attrContent = attrContent;
	    				
	    				var currChildren = QuDesigner.app.currentTabContainer().getChildren();
	    				if(currChildren.length==1){
	    					if(currChildren[0].canvas.figures.size==0 && currChildren[0].title=='New'){
	    						QuDesigner.app.currentTabContainer().removeChild(currChildren[0]);
	    					}
	    				}
	    				QuDesigner.app.openCanvas(info, attrContent['actInfo'].QUESTACTID);
	    			}
	    		}
    		});
		}
	});
});