define(["dojo/_base/declare",
        "dijit/form/TextBox",
        "dijit/form/Button",
        "dijit/registry", 
        "dojo/parser", 
        "dijit/Dialog", 
        "dojo/domReady!"], function(declare, TextBox, Button, registry, parser, Dialog){
	return declare("app.right.QwestEdit", Dialog, {
		figure:null,
		
		html:' <div class="dijitDialogPaneContentArea">' +
			 '	<table>' +
			 '		<tr>' +
			 '			<td><label for="loc">퀘스트명: </label></td>' +
			 '			<td colspan="3"><input data-dojo-type="dijit/form/TextBox" type="text" name="name" itemid="name" style="width:320px"></td>' +
			 '		</tr>' +
			 '		<tr>' +
			 '			<td><label for="loc">내용: </label></td>' +
			 '			<td colspan="3"><textarea row="20" cols="40" name="desc" itemid="desc" data-dojo-type="dijit/form/SimpleTextarea" style="width:320px;height:120px"></textarea></td>' +
			 '		</tr>' +
			 '		<tr>' +
			 '			<td><label for="loc">시작일: </label></td>' +
			 '			<td><input data-dojo-type="dijit/form/DateTextBox" data-dojo-props="placeHolder:\'StartDate\'" type="text" name="stateDate" itemid="stateDate" style="width:130px"></td>' +
			 '			<td><label for="loc">&nbsp;&nbsp;&nbsp;종료일: </label></td>' +
			 '			<td><input data-dojo-type="dijit/form/DateTextBox" data-dojo-props="placeHolder:\'EndDate\'" type="text" name="endDate" itemid="endDate" style="width:130px"></td>' +
			 '		</tr>' +
			 '	</table>' +
			 ' </div>' +
			 ' <div class="dijitDialogPaneActionBar">' +
			 '	<button data-dojo-type="dijit/form/Button" type="button" itemid="save" nodata="true">저장</button>' +
			 '	<button data-dojo-type="dijit/form/Button" type="button" itemid="cancel" nodata="true">취소</button>' +
			 ' </div>',
			
		constructor: function() {
			var me = this;		
			me.title = '속성편집';
			me.style = "width:400px"
			me.content = me.html;
		},
		
		startup:function(){
			var me = this;	
			QuDesigner.app.getChildById(me, 'save').onClick = function(evt){
				var quCanvas = QuDesigner.app.currentCanvas();
				var metaInfo = quCanvas.attrContent[me.figure.id];
				metaInfo._type_ = 'qwest';
				var arr = me.getChildren();
	    		for(var i=0; i<arr.length; i++){
	    			if(!arr[i].nodata){
	    				metaInfo[arr[i].itemid] = arr[i].getValue();
	    			}
	    		}
				me.hide();
	        }
			QuDesigner.app.getChildById(me, 'cancel').onClick = function(evt){
				me.hide();
	        }
		},
		
		editStart:function(figure){
			var me = this;	
			if(figure){
				me.figure = figure;
				me.show();
				var quCanvas = QuDesigner.app.currentCanvas();
				var metaInfo = quCanvas.attrContent[me.figure.id]
				var arr = me.getChildren();
	    		for(var i=0; i<arr.length; i++){
	    			if(!arr[i].nodata){
	    				if(metaInfo[arr[i].itemid]){
	    					arr[i].setValue(metaInfo[arr[i].itemid]);
	    				}else{
	    					arr[i].setValue(null);
	    				}
	    			}
	    		}
			}else{
				
			}
		}
	});
});