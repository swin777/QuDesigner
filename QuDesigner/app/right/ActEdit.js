define(["dojo/_base/declare",
        "dijit/form/TextBox",
        "dijit/form/Button",
        "dijit/registry", 
        "dojo/parser", 
        "dijit/Dialog", 
        "dojo/domReady!"], function(declare, TextBox, Button, registry, parser, Dialog){
	return declare("app.right.ActEdit", Dialog, {
		
		html:' <div class="dijitDialogPaneContentArea">' +
			 '	<table>' +
			 '		<tr>' +
			 '			<td><label for="loc">이름: </label></td>' +
			 '			<td colspan="3"><input data-dojo-type="dijit/form/TextBox" type="text" name="TITLE" itemid="TITLE" style="width:320px"></td>' +
			 '		</tr>' +
			 '		<tr>' +
			 '			<td><label for="loc">내용: </label></td>' +
			 '			<td colspan="3"><textarea row="20" cols="40" name="DESCRIPTION" itemid="DESCRIPTION" data-dojo-type="dijit/form/SimpleTextarea" style="width:320px;height:120px"></textarea></td>' +
			 '		</tr>' +
			 '		<tr>' +
			 '			<td><label for="loc">시작일: </label></td>' +
			 '			<td><input data-dojo-type="dijit/form/DateTextBox" data-dojo-props="placeHolder:\'StartDate\'" type="text" name="STARTDATE" itemid="STARTDATE" constraints="{datePattern:\'yyyy-MM-dd\', strict:true}" style="width:130px"></td>' +
			 '			<td><label for="loc">&nbsp;&nbsp;&nbsp;종료일: </label></td>' +
			 '			<td><input data-dojo-type="dijit/form/DateTextBox" data-dojo-props="placeHolder:\'EndDate\'" type="text" name="ENDDATE" itemid="ENDDATE" constraints="{datePattern:\'yyyy-MM-dd\', strict:true}" style="width:130px"></td>' +
			 '		</tr>' +
			 '	</table>' +
			 ' </div>' +
			 ' <div class="dijitDialogPaneActionBar">' +
			 '	<button data-dojo-type="dijit/form/Button" type="button" itemid="save" nodata="true">저장</button>' +
			 '	<button data-dojo-type="dijit/form/Button" type="button" itemid="cancel" nodata="true">취소</button>' +
			 ' </div>',
			
		constructor: function() {
			var me = this;		
			me.title = 'Act 편집';
			me.style = "width:400px"
			me.content = me.html;
		},
		
		startup:function(){
			var me = this;	
			QuDesigner.app.getChildById(me, 'save').onClick = function(evt){
				var quCanvas = QuDesigner.app.currentCanvas();
				var metaInfo = quCanvas.attrContent.actInfo;
				metaInfo._type_ = 'act';
				var arr = me.getChildren();
	    		for(var i=0; i<arr.length; i++){
	    			if(!arr[i].nodata){
	    				if(arr[i].getValue() instanceof Date){
	    					metaInfo[arr[i].itemid] = me.yyyymmdd(arr[i].getValue());
	    				}else{
	    					metaInfo[arr[i].itemid] = arr[i].getValue();
	    				}
	    			}
	    		}
	    		QuDesigner.app.currentTab().set('title', metaInfo.TITLE);
				me.hide();
	        }
			QuDesigner.app.getChildById(me, 'cancel').onClick = function(evt){
				me.hide();
	        }
		},
		
		editStart:function(){
			var me = this;	
			me.show();
			var quCanvas = QuDesigner.app.currentCanvas();
			var metaInfo = quCanvas.attrContent['actInfo'];
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
		},
		
		yyyymmdd:function(date) {
			var yyyy = date.getFullYear().toString();
			var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
			var dd  = date.getDate().toString();
			return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
		}
	});
});