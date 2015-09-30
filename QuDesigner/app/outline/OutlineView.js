define(["dojo/_base/declare",
        "dijit/layout/AccordionContainer",
        "dijit/layout/ContentPane",], function(declare, AccordionContainer, ContentPane){
	return declare("app.outline.OutlineView", AccordionContainer, {
		contentPane:null,
		
		constructor: function() {
			var me = this;		
			me.region = "top";
			QuDesigner.app.eventbus.addEventListener('addcanvas', function(quCanvas) {
				quCanvas.getCommandStack().addEventListener(this);
			}, this);
			
			QuDesigner.app.eventbus.addEventListener('changecanvas', function(quCanvas) {
				if(quCanvas) {
					var timer = setInterval(function(){ 
						me.repaint(quCanvas, null);
						clearInterval(timer);
					}, 500);
				} else {
					$("#outLineDiv").html('');
				}
			}, this);
			
			QuDesigner.app.eventbus.addEventListener('labelViewToogle', function(quCanvas) {
				me.exportPng(quCanvas);
			}, this);
			
			QuDesigner.app.eventbus.addEventListener('autoLayout', function(quCanvas) {
				me.exportPng(quCanvas);
			}, this);
		},
		
		startup:function(){
			var me = this;		
			this.inherited(arguments);
			me.contentPane = new ContentPane({title:'outLine', style:'height:200px; width:280px; padding:0px; overflow:hidden'});
			me.addChild(me.contentPane);
			
			$('#'+me.contentPane.domNode.id).append(
					'<div style="position:relative; width:99%; height:99%;">'+
				 		'<div id="outLineDiv" style="position:absolute; overflow:hidden; width:1500px; height:1500px;"></div>'+
				 		'<div id="viewDiv" style="position:absolute; border-width:0px; border-style:dashed; border-color:#9E032F; width:100%; height:100%;"></div>'+
				 	'</div>');
		},
		
		repaint : function(quCanvas, command) {
			if(!quCanvas && command.figure){
				quCanvas = command.figure.getCanvas();
			}else if(!quCanvas && command.con){
				quCanvas = command.con.getCanvas();
			}
				
			if(quCanvas)
				this.exportPng(quCanvas);
			this.outLineDivWidth = $("#outLineDiv").width();
			this.outLineDivHeight = $("#outLineDiv").height();
			this.viewWidth = $("#viewDiv").width();
			this.viewHeight = $("#viewDiv").height();
			this.viewDivObj = $("#viewDiv");
			var me = this;
			var par = QuDesigner.app.currentCanvas().html.parent();
			$('#viewDiv').bind('drag',function( event ){
	        	par.scrollLeft(me.viewDivObj.css("left").replace("px", "")*(1/me.g_rate));
	        	par.scrollTop(me.viewDivObj.css("top").replace("px", "")*(1/me.g_rate));
	        });
	        $('#viewDiv').mousedown(function( event ){
	        	par.off('scroll');
	        });
	        $('#viewDiv').mouseup(function( event ){
	        	par.scroll('scroll', function() {
					me.viewDivObj.css("left", par.scrollLeft()*me.g_rate  );
					me.viewDivObj.css("top", par.scrollTop()*me.g_rate );
				});
	        });
	        $('#viewDiv').mouseout(function( event ){
	        	par.scroll('scroll', function() {
					me.viewDivObj.css("left", par.scrollLeft()*me.g_rate  );
					me.viewDivObj.css("top", par.scrollTop()*me.g_rate );
				});
	        });
	        par.on('scroll', function() {
				me.viewDivObj.css("left", par.scrollLeft()*me.g_rate  );
				me.viewDivObj.css("top", par.scrollTop()*me.g_rate );
			});
		},
		
		exportPng : function(quCanvas) {
			var svg = quCanvas.getHtmlContainer().html().replace(/>\s+/g, ">").replace(/\s+</g, "<");
			svg = svg.substring(0,4) + ' ' + ' xmlns:xlink="http://www.w3.org/1999/xlink" ' + svg.substring(5);
			if(!svg.match("xlink:href=")){
				svg = svg.split("href=").join("xlink:href=");	
			}
			$("#outLineDiv").html(svg);
			var figureAreaPostion = quCanvas.figureAreaPostion();
			var wRate = 1;
			var hRate = 1;
			if(figureAreaPostion.maxX!=0){
				if(figureAreaPostion.minX < quCanvas.getWidth()){
					wRate = Math.sqrt(Math.pow($("#outLineDiv").parent().css("width").replace("px", ""),2)/Math.pow(figureAreaPostion.maxX+figureAreaPostion.minX,2));	
				}else{
					wRate = Math.sqrt(Math.pow($("#outLineDiv").parent().css("width").replace("px", ""),2)/Math.pow(figureAreaPostion.maxX+20,2));
				}
			}
			if(figureAreaPostion.maxY!=0){
				if(figureAreaPostion.minY < quCanvas.getHeight()){
					hRate = Math.sqrt(Math.pow($("#outLineDiv").parent().css("height").replace("px", ""),2)/Math.pow(figureAreaPostion.maxY+figureAreaPostion.minY,2));
				}else{
					hRate = Math.sqrt(Math.pow($("#outLineDiv").parent().css("height").replace("px", ""),2)/Math.pow(figureAreaPostion.maxY+20,2));
				}
			}
			var rate = Math.min(hRate, wRate);
			this.g_rate = rate;
			$("#outLineDiv").css("overflow","hidden");
			$('#outLineDiv').css('-webkit-transform','scale(' + (rate) + ')');
			$('#outLineDiv').css('-webkit-transform-origin','0 0');
			$('#outLineDiv').css('-moz-transform','scale(' + (rate) + ')');
			$('#outLineDiv').css('-moz-transform-origin','0 0');
			$('#outLineDiv').css('-o-transform','scale(' + (rate) + ')');
			$('#outLineDiv').css('-o-transform-origin','0 0');
			$("#outLineDiv").css("width", this.outLineDivWidth*(1/rate));
			$("#outLineDiv").css("height", this.outLineDivHeight*(1/rate));
			$("#viewDiv").css("border-width","1px");
			$("#viewDiv").css("-webkit-box-shadow","rgba(100, 100, 100, 0.498039) 0px 0px 0px 9000px");
			
			$("#viewDiv").draggable();
			
			var viewRateX = quCanvas.html.parent().width()/figureAreaPostion.maxX;	
			var viewRateY = quCanvas.html.parent().height()/figureAreaPostion.maxY;
			if(viewRateX<1){
				$("#viewDiv").css("width", (quCanvas.html.parent().width()-15) * rate);
			}else{
				$("#viewDiv").css("width", "100%");
			}				
			if(viewRateY<1){
				$("#viewDiv").css("height", (quCanvas.html.parent().height()-15) * rate);
			}else{
				$("#viewDiv").css("height", "100%");
			}
		},
		
		stackChanged : function(event) {
			var me = this;
			if(event.isPreChangeEvent())
				return;
			var timer = setInterval(function(){ 
				//me.exportPng(QuDesigner.app.currentCanvas());
				me.repaint(event.command.canvas, event.command);
				clearInterval(timer);
			}, 100);
			
		}
	});
});