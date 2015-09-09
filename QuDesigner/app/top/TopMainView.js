define(["dojo/_base/declare", 
        "dijit/MenuBar",
        "dijit/DropDownMenu",
        "dijit/PopupMenuBarItem",
        "dijit/MenuBarItem",
        "ashDraw/io/json/Writer",
        "app/top/ActList",
        "app/top/ImportList",
        "ashDraw/io/png/Writer",
        "dojo/json"], function(declare, MenuBar, DropDownMenu, PopupMenuBarItem, MenuBarItem, Writer, ActList, ImportList, PngWriter, json){
	return declare("app.top.TopMainView", MenuBar, {
		actList:null,
		importList:null,
		
		constructor: function() {
			var me = this;
			me['class'] = 'primary inverse';
			me.style = "height:40px;  background-color:#000000; margin-bottom:0px; background-image:none";
		},
		
		startup:function(){
			var me = this;
			$('#'+me.domNode.id).append('<span class="brand">QuriousPlayer Modeler</span>');
			
			me.addChild(new MenuBarItem({
		        label: "New",
		        onClick: function(evt){
		        	QuDesigner.app.addCanvas();
		        }
		    }));
			
			me.addChild(new MenuBarItem({
		        label: "Open",
		        onClick: function(evt){
//		        	var info = {};
//		        	info.title = '헤이맨';
//		    		info.diagramContent = '[{"type":"ashDrawEx.shape.node.basic.Group","id":"67b7cfdc-9510-a60f-9d74-8d87e5536299","x":90,"y":110,"width":321,"height":297,"label":"","radius":2,"gLabel":"아담스미스"},{"type":"ashDrawEx.shape.node.basic.Group","id":"ea4c7581-03e3-ddde-0a75-b9508340187b","x":570,"y":130,"width":226,"height":150,"label":"","radius":2,"gLabel":"하이에크"},{"type":"ashDrawEx.shape.node.basic.Group","id":"7c84abec-89a9-8bea-406b-16788949f98c","x":880,"y":410,"width":150,"height":150,"label":"","radius":2,"gLabel":"칼포퍼"},{"type":"ashDrawEx.shape.node.basic.Group","id":"9727ac2f-ffc7-80e0-e69e-6f58274208fe","x":430,"y":680,"width":150,"height":150,"label":"","radius":2,"gLabel":"복거일"},{"type":"ashDrawEx.shape.node.basic.Rectangle","id":"97ec09c2-6728-45df-1c33-2323b2cca552","x":130,"y":140,"width":50,"height":50,"label":"","radius":2,"gId":"67b7cfdc-9510-a60f-9d74-8d87e5536299","dx":40,"dy":30},{"type":"ashDrawEx.shape.node.basic.Rectangle","id":"00d6f0ed-5410-c128-0650-cb848c7449d5","x":230,"y":240,"width":50,"height":50,"label":"","radius":2,"gId":"67b7cfdc-9510-a60f-9d74-8d87e5536299","dx":140,"dy":130},{"type":"ashDrawEx.shape.node.basic.Rectangle","id":"b4d8f9ed-6396-1336-209a-2375433ee265","x":304,"y":323,"width":50,"height":50,"label":"","radius":2,"gId":"67b7cfdc-9510-a60f-9d74-8d87e5536299","dx":214,"dy":213},{"type":"ashDrawEx.shape.node.basic.Image","id":"57c07069-1b42-e149-cadd-d6f032ef77d4","x":590,"y":149,"width":50,"height":50,"path":"/dynagram/resources/images/designer/notation/default/default-node.png","gId":"ea4c7581-03e3-ddde-0a75-b9508340187b","dx":20,"dy":20},{"type":"ashDrawEx.shape.node.basic.Circle","id":"636f5112-dd17-602f-6b05-749ce079aa12","x":490,"y":720,"width":50,"height":50,"label":"","gId":"9727ac2f-ffc7-80e0-e69e-6f58274208fe","dx":60,"dy":40},{"type":"ashDrawEx.shape.node.basic.Diamond","id":"5c8393df-9d45-9a54-735c-e3fd4472d3b5","x":930,"y":450,"width":60,"height":60,"label":"","gId":"7c84abec-89a9-8bea-406b-16788949f98c","dx":50,"dy":40},{"type":"ashDrawEx.shape.node.basic.Oval","id":"6c5d2ebb-542a-b2e7-2069-d456c9deabce","x":710,"y":219,"width":60,"height":40,"label":"","gId":"ea4c7581-03e3-ddde-0a75-b9508340187b","dx":140,"dy":90},{"type":"ashDraw.Connection","id":"e78508f8-ea42-b6d3-811c-5454579daaa9","label":"","source":{"node":"67b7cfdc-9510-a60f-9d74-8d87e5536299","port":"hybrid3"},"target":{"node":"ea4c7581-03e3-ddde-0a75-b9508340187b","port":"hybrid2"},"connectType":"Direct"},{"type":"ashDraw.Connection","id":"75dfc6d9-e7ab-842e-9f80-ad5d17d73814","label":"","source":{"node":"ea4c7581-03e3-ddde-0a75-b9508340187b","port":"hybrid3"},"target":{"node":"7c84abec-89a9-8bea-406b-16788949f98c","port":"hybrid0"},"connectType":"Bezier"},{"type":"ashDraw.Connection","id":"d530beb6-f0da-4e23-674d-8695ae71ff94","label":"","source":{"node":"7c84abec-89a9-8bea-406b-16788949f98c","port":"hybrid1"},"target":{"node":"9727ac2f-ffc7-80e0-e69e-6f58274208fe","port":"hybrid3"},"connectType":"Manhattan"},{"type":"ashDraw.Connection","id":"110a311b-804a-694e-b6cf-43ea5cd7c111","label":"","source":{"node":"97ec09c2-6728-45df-1c33-2323b2cca552","port":"hybrid1"},"target":{"node":"00d6f0ed-5410-c128-0650-cb848c7449d5","port":"hybrid2"},"connectType":"Manhattan"},{"type":"ashDraw.Connection","id":"8bcfcc19-af34-b87e-ea57-ae23a582d9c4","label":"","source":{"node":"00d6f0ed-5410-c128-0650-cb848c7449d5","port":"hybrid1"},"target":{"node":"b4d8f9ed-6396-1336-209a-2375433ee265","port":"hybrid2"},"connectType":"Manhattan"},{"type":"ashDraw.Connection","id":"ef434225-cbb9-31b0-b1ac-6d93780bb4df","label":"","source":{"node":"57c07069-1b42-e149-cadd-d6f032ef77d4","port":"output0"},"target":{"node":"6c5d2ebb-542a-b2e7-2069-d456c9deabce","port":"input0"},"connectType":"Direct"}]';
//		    		QuDesigner.app.openCanvas(info);
		        	if(!me.actList){
		        		me.actList = new ActList();
		        	}
		        	me.actList.listStart();
		        }
		    }));
			
//			me.addChild(new MenuBarItem({
//		        label: "Import",
//		        onClick: function(evt){
//		        	if(!me.importList){
//		        		me.importList = new ImportList();
//		        	}
//		        	me.importList.listStart();
//		        }
//		    }));
			
			me.addChild(new MenuBarItem({
		        label: "Save",
		        onClick: function(evt){
		        	var quCanvas = QuDesigner.app.currentCanvas();
		    		if(quCanvas){
		    			var writer = new Writer();
		    			//var design = json.stringify(writer.marshal(quCanvas), null, 2);
		    			var figures = quCanvas.getFigures().data;
		    			var lines = quCanvas.getLines().data;
		    			var attributes = quCanvas.attrContent;
		    			var saveAttributes = {};
		    			for(var member in attributes){
		    				if(member=='actInfo'){
		    					saveAttributes[member] = attributes[member];
		    				}else{
		    					for(var i=0; i<figures.length; i++){
			    					if(figures[i] && figures[i].id && member == figures[i].id){
			    						saveAttributes[member] = attributes[member];
			    						break;
			    					}
			    				}
		    					for(var i=0; i<lines.length; i++){
			    					if(lines[i] && lines[i].id && member == lines[i].id){
			    						saveAttributes[member] = attributes[member];
			    						break;
			    					}
			    				}
		    				}
		    			}
		    			quCanvas.attrContent = saveAttributes;
		    			var content = {design:writer.marshal(quCanvas),
		    						   attributes:saveAttributes};
		    			var obj = {content:json.stringify(content)};
		    			dojo.xhr.post({
			        		url: app.application.config.businessServer+"/saveContent",
			        		handleAs: "json",
			        		content:obj,
			        		load: function(res) {
			        			if(res && res.result && res.result=='ok'){
			        				alert('save성공');
			        			}else{
			        				alert('save실패');
			        			}
			        		}
		    			});
		    		}	
		        	
		        }
		    }));
			
			me.addChild(new MenuBarItem({
		        label: "Copy",
		        onClick: function(evt){
		        	QuDesigner.app.tmpCanvas.clear();
		        	var quCanvas = QuDesigner.app.currentCanvas();
		    		if(quCanvas){
		    			   var globalSelection = [];
						   var globalLineSelection = [];
						   var minX = 9999999;
						   var minY = 9999999;
						   for(i=0; i<quCanvas.currentMultiSelection.getSize(); i++){
							   var figure = quCanvas.currentMultiSelection.get(i);
							   if(minX>figure.x){
								   minX = figure.x;
							   }
							   if(minY>figure.y){
								   if(figure instanceof ashDrawEx.shape.node.basic.Group){
									   minY = figure.y - 20;
								   }else{
									   minY = figure.y;
								   }
							   }
						   }
						   for(i=0; i<quCanvas.currentMultiSelection.getSize(); i++){
							   var figure = quCanvas.currentMultiSelection.get(i);
							   var cloneFigure;
							   if(figure.gLabel){
								   cloneFigure = new Function("return new " + figure.declaredClass + "('"+figure.gLabel+"')")();
							   }else{
								   cloneFigure = new Function("return new " + figure.declaredClass + "()")();
							   }
							   cloneFigure.width = figure.width;
							   cloneFigure.height = figure.height;
							   cloneFigure.x = figure.x - minX + 1;
							   cloneFigure.y = figure.y - minY + 3;
							   cloneFigure.setLabel(figure.label);
							   if(figure.gLabel){
								   cloneFigure.gLabel = figure.gLabel;
							   }
							   cloneFigure.orgId = figure.id;
							   cloneFigure.orgPorts = figure.getPorts();
							   globalSelection.push(cloneFigure);
						   }
						   var lines = quCanvas.getLines().data;
						   for(var k=0; k<lines.length; k++){
							   var chk = 0;
							   if(lines[k] && lines[k].sourcePort && lines[k].sourcePort.parent){
								   var source = lines[k].sourcePort;
								   var target = lines[k].targetPort;
								   var lineInfo = {};
								   for(j=0; j<globalSelection.length; j++){
									   var figure = globalSelection[j];
									   if(source.parent.id==figure.orgId){
										   lineInfo.source = figure;
										   var ports = figure.orgPorts.data;
										   for(x=0; x<ports.length; x++){
											   if(source.id==ports[x].id){
												   lineInfo.sourceSeq = x;
												   break;
											   }
											   
										   }
										   chk++;
									   }
									   if(target.parent.id==figure.orgId){
										   lineInfo.target = figure;
										   var ports = figure.orgPorts.data;
										   for(x=0; x<ports.length; x++){
											   if(target.id==ports[x].id){
												   lineInfo.targetSeq = x;
												   break;
											   }
											   
										   }
										   chk++;
									   }
								   }
								   if(chk==2){
									   lineInfo.connectType = lines[k].connectType;
									   globalLineSelection.push(lineInfo)
								   }
							   }
						   }
		    		}	
		    		
		    		for(i=0; i<globalSelection.length; i++){
	    				   var figure = globalSelection[i];
	    				   var command = new ashDraw.command.CommandAdd(QuDesigner.app.tmpCanvas, figure, figure.x, figure.y);
	    				   QuDesigner.app.tmpCanvas.getCommandStack().execute(command);
	    			   }
	    			   
	    			   for(i=0; i<globalLineSelection.length; i++){
	    				   var line = globalLineSelection[i];
	    				   var sourcePorts = line.source.getPorts();
	    				   var targetPorts = line.target.getPorts();
	    				   var conn = ashDraw.Connection.createConnection(sourcePorts.data[line.sourceSeq], targetPorts.data[line.targetSeq], line.connectType);
	    				   conn.setTargetDecorator(new ashDraw.decoration.connection.ArrowDecorator());
	    				   var command = new ashDraw.command.CommandConnect(QuDesigner.app.tmpCanvas, sourcePorts.data[line.sourceSeq], targetPorts.data[line.targetSeq], line.connectType);
	    				   command.setConnection(conn);
	    				   QuDesigner.app.tmpCanvas.getCommandStack().execute(command);
	    			   }
		        }
		    }));
			
			me.addChild(new MenuBarItem({
		        label: "Paste",
		        onClick: function(evt){
		        	var quCanvas = QuDesigner.app.currentCanvas();
		    		if(quCanvas){
		    			
		    			   var globalSelection = [];
						   var globalLineSelection = [];
						   for(i=0; i<QuDesigner.app.tmpCanvas.getFigures().getSize(); i++){
							   var figure = QuDesigner.app.tmpCanvas.getFigures().get(i);
							   var cloneFigure;
							   if(figure.gLabel){
								   cloneFigure = new Function("return new " + figure.declaredClass + "('"+figure.gLabel+"')")();
							   }else{
								   cloneFigure = new Function("return new " + figure.declaredClass + "()")();
							   }
							   cloneFigure.width = figure.width;
							   cloneFigure.height = figure.height;
							   cloneFigure.x = figure.x;
							   cloneFigure.y = figure.y;
							   cloneFigure.setLabel(figure.label);
							   if(figure.gLabel){
								   cloneFigure.gLabel = figure.gLabel;
							   }
							   cloneFigure.orgId = figure.id;
							   cloneFigure.orgPorts = figure.getPorts();
							   globalSelection.push(cloneFigure);
						   }
						   var lines = QuDesigner.app.tmpCanvas.getLines().data;
						   for(var k=0; k<lines.length; k++){
							   var chk = 0;
							   if(lines[k] && lines[k].sourcePort && lines[k].sourcePort.parent){
								   var source = lines[k].sourcePort;
								   var target = lines[k].targetPort;
								   var lineInfo = {};
								   for(j=0; j<globalSelection.length; j++){
									   var figure = globalSelection[j];
									   if(source.parent.id==figure.orgId){
										   lineInfo.source = figure;
										   var ports = figure.orgPorts.data;
										   for(x=0; x<ports.length; x++){
											   if(source.id==ports[x].id){
												   lineInfo.sourceSeq = x;
												   break;
											   }
											   
										   }
										   chk++;
									   }
									   if(target.parent.id==figure.orgId){
										   lineInfo.target = figure;
										   var ports = figure.orgPorts.data;
										   for(x=0; x<ports.length; x++){
											   if(target.id==ports[x].id){
												   lineInfo.targetSeq = x;
												   break;
											   }
											   
										   }
										   chk++;
									   }
								   }
								   if(chk==2){
									   lineInfo.connectType = lines[k].connectType;
									   globalLineSelection.push(lineInfo)
								   }
							   }
						   }  
						   var writer = new PngWriter();
							var png = writer.marshal(QuDesigner.app.tmpCanvas);
						   quCanvas.pasteReady(globalSelection, globalLineSelection, png);
		    			   
		    		}	
		        }
		    }));
			
			me.addChild(new MenuBarItem({
		        label: "이전",
		        onClick: function(evt){
		        	var quCanvas = QuDesigner.app.currentCanvas();
		    		if(quCanvas){
		    			quCanvas.getCommandStack().undo();
		    		}	
		        }
		    }));
			
			me.addChild(new MenuBarItem({
		        label: "다음",
		        onClick: function(evt){
		        	var quCanvas = QuDesigner.app.currentCanvas();
		    		if(quCanvas){
		    			quCanvas.getCommandStack().redo();
		    		}	
		        }
		    }));
			
			me.addChild(new MenuBarItem({
		        label: "삭제",
		        onClick: function(evt){
		        	var quCanvas = QuDesigner.app.currentCanvas();
		    		if(quCanvas){
		    			quCanvas.removeFigureCommand();
		    		}	
		        }
		    }));
			
//			me.addChild(new MenuBarItem({
//		        label: "배경격자",
//				onClick: function(evt){
//		        	var quCanvas = QuDesigner.app.currentCanvas();
//		    		if(quCanvas){
//		    			quCanvas.setGrid();
//		    		}	
//		        }
//		    }));

			var pSubMenu = new DropDownMenu({});
			pSubMenu.addChild(new dijit.MenuItem({
				label:"직선",
				onClick: function(evt){
		        	var quCanvas = QuDesigner.app.currentCanvas();
		    		if(quCanvas){
		    			quCanvas.setConnectType("DirectRouter");
		    		}	
		        }
			}));
			pSubMenu.addChild(new dijit.MenuItem({
				label:"꺽은선",
				onClick: function(evt){
		        	var quCanvas = QuDesigner.app.currentCanvas();
		    		if(quCanvas){
		    			quCanvas.setConnectType("ManhattanBridgedConnectionRouter");
		    		}	
		        }
			}));
			pSubMenu.addChild(new dijit.MenuItem({
				label:"곡선",
				onClick: function(evt){
		        	var quCanvas = QuDesigner.app.currentCanvas();
		    		if(quCanvas){
		    			quCanvas.setConnectType("BezierConnectionRouter");
		    		}	
		        }
			}));
			me.addChild(new PopupMenuBarItem({
		          label:"선종류",
		          popup:pSubMenu
		    }));
			
			var pSubMenu2 = new DropDownMenu({});
			pSubMenu2.addChild(new dijit.MenuItem({
				label:"수직"
			}));
			pSubMenu2.addChild(new dijit.MenuItem({
				label:"수평"
			}));
			me.addChild(new PopupMenuBarItem({
		          label:"정렬",
		          popup:pSubMenu2
		    }));
			
		}
	});
});