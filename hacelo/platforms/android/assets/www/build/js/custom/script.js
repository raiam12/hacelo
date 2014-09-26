/*
 *@author Smart Solutions
 *@date
 *
 *
 */
 /*(function(){
 	window.strings = window.strings || {};
 	var upload_template, login_template, pay_template, dkrm;

 	/*
 	 * Init function
 	 *
 	 */
 	/*(function init(){
 		$.getJSON( "config/strings.json", function( data ) { 
 			var template = new fit_template(data);
 			upload_template = template.get_full_template("#login-picture");
 			login_template = template.get_full_template("#login-picture");   
 			$(upload_template).appendTo("body");
 			add_events();
    	});

 	})();


 	/*
 	 * Class to create templates
 	 *
 	 */

 	/*var fit_template = function(strings){
 		this.strings = strings;
 	};

	/*
 	 * Functions for main class
 	 *
 	 */
 	/*fit_template.prototype = {
 		get_full_template : function(id){
 			var html = $(id).html();
 			var template = Handlebars.compile(html);
 			return template(this.strings);
 		}
 	};

 	/*
 	 *Adding events to entire page
 	 *
 	 */
 	 /*function add_events(){
 	 	$('body').delegate("a","click",function(){
 	 		  dkrm = new Darkroom('#target', {
			      minWidth: 0,
			      minHeight: 0,
			      maxWidth: 320,
			      maxHeight: 240,
			      plugins: {
			        crop: {
			          quickCropKey: 67, 
			          ratio: 1
			        }
			      },
			      init: function() {
			        var cropPlugin = this.getPlugin('crop');
			        cropPlugin.selectZone(170, 25, 300, 300);
			      }
			});
		    /*
		    dkrm.snapshotImage();
		    */
 	 	/*});

 	 	$(".ingresar-data").on('click',function(){
 	 		$(".main-content").css("-webkit-transform","translate3d(-33%,0,0)");
 	 	});

 	 	

 	 };
    
 })();*/






 (function(){

 	window.hacelo = window.hacelo || {};
 	window.hacelo = {
 		alert : function(string){
 			alert(string);
 		}
 	};

 })();