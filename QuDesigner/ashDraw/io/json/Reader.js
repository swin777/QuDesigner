define(["dojo/_base/declare", "ashDraw/io/Reader", "ashDraw/util/UUID"], function(declare){
	return declare("ashDraw.io.json.Reader", ashDraw.io.Reader, {
		"-chains-": {
	        constructor: "manual"
	    },
		constructor: function() {
			this.inherited(arguments);
	    },
	    
	    unmarshal: function(canvas, orgJson){
	        var node=null;
	        var cnt = 0;
	        var attrContent = canvas.attrContent;
	        var groupArr = [];
	        var notGroupArr = [];
	        for(var i=0; i<orgJson.length; i++){
	        	var obj = orgJson[i];
	        	if(obj.gLabel){
	        		groupArr.push(obj);
	        	}else{
	        		notGroupArr.push(obj);
	        	}
	        }
	        var json = [];
	        for(var i=0; i<groupArr.length; i++){
	        	json.push(groupArr[i]);
	        }
	        for(var i=0; i<notGroupArr.length; i++){
	        	json.push(notGroupArr[i]);
	        }
	        $.each(json, function(i, element){
	        	cnt++;
	            var o = eval("new "+element.type+"()");
	            if(o instanceof ashDraw.Connection){
	        		o.setTargetDecorator(new ashDraw.decoration.connection.ArrowDecorator());
	        	}
	            var source= null;
	            var target=null;
	            for(i in element){
	                var val = element[i];
	                if(i === "source"){
	                    node = canvas.getFigure(val.node);
	                    source = node.getPort(val.port);
	                }
	                else if (i === "target"){
	                    node = canvas.getFigure(val.node);
	                    target = node.getPort(val.port);
	                }
	            }
	            if(source!==null && target!==null){
	                o.setSource(source);
	                o.setTarget(target);
	            }
	            o.setPersistentAttributes(element);
	            canvas.addFigure(o);
	            if(!attrContent[o.id]){
	            	attrContent[o.id] = {};
	            }
	            if(!attrContent.actInfo){
	            	attrContent.actInfo = {key:ashDraw.util.UUID.create()};
	            }
	            if(json.length==cnt){
	            	QuDesigner.app.eventbus.dispatch('unmarshalComplete', canvas);
	            }
	        });
	    }
	});
});