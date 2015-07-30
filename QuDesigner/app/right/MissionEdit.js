define(["dojo/_base/declare",
        "dijit/form/TextBox",
        "dijit/form/Button",
        "dijit/registry", 
        "dojo/parser", 
        "dijit/Dialog", 
        "dojo/domReady!"], function(declare, TextBox, Button, registry, parser, Dialog){
	return declare("app.right.MissionEdit", Dialog, {
		figure:null,
		
		html:' <div class="dijitDialogPaneContentArea">' +
			 '	<table>' +
			 '		<tr>' +
			 '			<td><label for="loc">타이틀: </label></td>' +
			 '			<td><input data-dojo-type="dijit/form/TextBox" type="text" name="loc" itemid="title" style="width:320px"></td>' +
			 '		</tr>' +
			 '		<tr>' +
			 '			<td><label for="loc">내용: </label></td>' +
			 '			<td><input data-dojo-type="dijit/form/TextBox" type="text" name="loc" itemid="desc" style="width:320px"></td>' +
			 '		</tr>' +
			 '		<tr>' +
			 '			<td><label for="loc">URL: </label></td>' +
			 '			<td><input data-dojo-type="dijit/form/TextBox" type="text" name="loc" itemid="url" style="width:320px"></td>' +
			 '		</tr>' +
			 '	</table>' +
			 ' </div>' +
			 ' <div class="dijitDialogPaneActionBar">' +
			 '	<button data-dojo-type="dijit/form/Button" type="button" itemid="save">저장</button>' +
			 '	<button data-dojo-type="dijit/form/Button" type="button" itemid="cancel">취소</button>' +
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
				alert("저장")
				me.hide();
	        }
			QuDesigner.app.getChildById(me, 'cancel').onClick = function(evt){
				me.hide();
	        }
		},
		
		editStart:function(figure){
			var me = this;	
			if(figure){
				me.show();
			}else{
				
			}
		}
	});
});