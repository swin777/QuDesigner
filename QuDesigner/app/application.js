define(["dojo/_base/declare", 
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "app/custom/AshExpandoPane",
        "app/top/TopMainView",
        "app/center/DesignerView",
        "app/left/PalleteView",
        "app/left/OutlineView",
        "app/right/PropertyView",
        "dojo/domReady!"], function(declare, BorderContainer, ContentPane, AshExpandoPane,
        		TopMainView, DesignerView, PalleteView, OutlineView, PropertyView){
	return declare("app.application", null, {
		divId:null,
		topMainView:null,
		palleteView:null,
		outlineView:null,
		designerView:null,
		propertyView:null,
		
	    constructor: function(divId) {
	    	var me = this;
	    	me.divId = divId;
	        me.app.parent = me;
	    },
	    
	    makeLayout:function(){
	    	var me = this;
	    	var main = new BorderContainer({style: "height: 100%; width: 100%;"});
	        
	        //top start
	        var topPane = new ContentPane({
	        	region: "top",
	        	splitter:false,
	        	style: "height:45px; width:100%; padding:0px"
	        });
	        me.topMainView = new TopMainView();
	        topPane.addChild(me.topMainView);
	        main.addChild(topPane);
	        //top end
	        
	        //left start
	        var left = new AshExpandoPane({
	        	title:'left',
	        	region: "left",
	        	splitter:true,
	        	style: "height:100%; width:280px; padding:0px; border:0px"
	        });
	        me.palleteView = new PalleteView();
	        left.addChild(me.palleteView);
	        me.outlineView = new OutlineView();
	        left.addChild(me.outlineView);
	        main.addChild(left);
	        //left end

	        //center start
	        var centerPane = new ContentPane({
	        	region: "center",
	        	splitter:false,
	        	style: "height:90%; width:100%; padding:1px; border:0px"
	        });
        	me.designerView = new DesignerView
        	centerPane.addChild(me.designerView);
        	main.addChild(centerPane);
        	//center end
        	
	        //right start
        	var right = new AshExpandoPane({
	        	title:'right',
	        	region: "right",
	        	splitter:true,
	        	style: "height:100%; width:250px; padding:0px; border:0px"
	        });
	        me.propertyView = new PropertyView();
	        right.addChild(me.propertyView);
	        main.addChild(right);
	        //right end

	        $('#'+me.divId).html(main.domNode);
	        main.startup();
	        main.resize();
	    },
	    
	    app:{
	    	parent:null, 
	    	
	    	addCanvas:function(){
	    		this.parent.designerView.addCanvas();
	    	},
	    	
	    	openCanvas:function(info){
	    		this.parent.designerView.openCanvas(info);
	    	},
	    	
	    	currentCanvas:function(){
	    		return this.parent.designerView.selectedChildWidget.canvas;
	    	},
	    	
	    	getChildById:function(obj, itemid){
	    		if(!obj.getChildren){
	    			return null;
	    		}
	    		var arr = obj.getChildren();
	    		for(var i=0; i<arr.length; i++){
	    			console.log(arr[i].itemid)
	    			if(arr[i].itemid && arr[i].itemid==itemid){
	    				return arr[i]
	    			}
	    		}
	    		return null;
	    	},
	    	
	    	eventbus:{
	    		listeners:{},
	    		
	    		addEventListener:function(type, callback, scope) {
	    			var args = [];
	    			var numOfArgs = arguments.length;
	    			for(var i=0; i<numOfArgs; i++){
	    				args.push(arguments[i]);
	    			}		
	    			args = args.length > 3 ? args.splice(3, args.length-1) : [];
	    			if(typeof this.listeners[type] != "undefined") {
	    				this.listeners[type].push({scope:scope, callback:callback, args:args});
	    			} else {
	    				this.listeners[type] = [{scope:scope, callback:callback, args:args}];
	    			}
	    		},
	    		removeEventListener:function(type, callback, scope) {
	    			if(typeof this.listeners[type] != "undefined") {
	    				var numOfCallbacks = this.listeners[type].length;
	    				var newArray = [];
	    				for(var i=0; i<numOfCallbacks; i++) {
	    					var listener = this.listeners[type][i];
	    					if(listener.scope == scope && listener.callback == callback) {
	    						
	    					} else {
	    						newArray.push(listener);
	    					}
	    				}
	    				this.listeners[type] = newArray;
	    			}
	    		},
	    		hasEventListener:function(type, callback, scope) {
	    			if(typeof this.listeners[type] != "undefined") {
	    				var numOfCallbacks = this.listeners[type].length;
	    				if(callback === undefined && scope === undefined){
	    					return numOfCallbacks > 0;
	    				}
	    				for(var i=0; i<numOfCallbacks; i++) {
	    					var listener = this.listeners[type][i];
	    					if((scope ? listener.scope == scope : true) && listener.callback == callback) {
	    						return true;
	    					}
	    				}
	    			}
	    			return false;
	    		},
	    		dispatch:function(type, target) {
		    		var numOfListeners = 0;
//		    		var event = {
//		    			type:type,
//		    			target:target
//		    		};
		    		var event = target;
		    		var args = [];
		    		var numOfArgs = arguments.length;
		    		for(var i=0; i<numOfArgs; i++){
		    			args.push(arguments[i]);
		    		};				
		    		args = args.length > 2 ? args.splice(2, args.length-1) : [];
		    		args = [event].concat(args);
		    		if(typeof this.listeners[type] != "undefined") {
		    			var numOfCallbacks = this.listeners[type].length;
		    			for(var i=0; i<numOfCallbacks; i++) {
		    				var listener = this.listeners[type][i];
		    				if(listener && listener.callback) {					
		    					var concatArgs = args.concat(listener.args);
		    					if(listener.scope.eventCheck && !listener.scope.currentMenuCheck() && type!=EventBus.leftMiddleMenuSelect){
		    						//console.log("이벤트 callback호출안한다.");
		    					}else{
		    						listener.callback.apply(listener.scope, concatArgs);
		    					}
		    					numOfListeners += 1;
		    				}
		    			}
		    		}
		    	},
		    	getEvents:function() {
		    		var str = "";
		    		for(var type in this.listeners) {
		    			var numOfCallbacks = this.listeners[type].length;
		    			for(var i=0; i<numOfCallbacks; i++) {
		    				var listener = this.listeners[type][i];
		    				str += listener.scope && listener.scope.className ? listener.scope.className : "anonymous";
		    				str += " listen for '" + type + "'\n";
		    			}
		    		}
		    		return str;
		    	}
	    	}
	    }
	});
});