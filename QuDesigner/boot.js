dojoConfig = {
		baseUrl: 'http://' + window.location.hostname + ':' + window.location.port,
		packages: [{name: "ashDraw", location: "ashDraw"},
		           {name: "ashDrawEx", location: "ashDrawEx"},
		           {name: "app", location: "app"},
		           {name: "dojo", location: "libs/dojoToolKit/dojo"},
		           {name: "dijit", location: "libs/dojoToolKit/dijit"},
		           {name: "dojox", location: "libs/dojoToolKit/dojox"},
		           {name: 'dbootstrap', location: 'libs/dojoToolKit/dbootstrap'}
		]
};

(function(){
	$LAB
	.script(dojoConfig.baseUrl + "/ashDraw/lib/raphael.js")
	.script(dojoConfig.baseUrl + "/ashDraw/lib/raphael-svg-filter.js")
	.script(dojoConfig.baseUrl + "/ashDraw/lib/jquery-1.11.3.min.js")
	.script(dojoConfig.baseUrl + "/ashDraw/lib/jquery-ui.min.js")
	.script(dojoConfig.baseUrl + "/ashDraw/lib/rgbcolor.js")
	.script(dojoConfig.baseUrl + "/ashDraw/lib/canvg.js")
	.script(dojoConfig.baseUrl + "/ashDraw/lib/json2.js")
	.script(dojoConfig.baseUrl + "/libs/dojoToolKit/dojo/dojo.js").wait(function(){
		dojo.ready(function(){
			$LAB.script(dojoConfig.baseUrl + "/ashDraw/ashDraw.js").wait(function(){
				require(dojoConfig, [
									"app/application",
			                     ], function(application){
						
						require(dojoConfig, ["dbootstrap"], function(dbootstrap){
							window.QuDesigner = new application('mainArea');
							window.QuDesigner.makeLayout();
						})
					}
				);
			})
		});
	});
})(); 