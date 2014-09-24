/*
 *
 *
 *
 *
 */

 var template_engine = function(json, template_id){
 	this.json = json;
 	this.template_id = template_id;
 }

 template_engine.prototype = {

 	register_helper : function(id, callback){
 		Handlerbars.registerHelper(id, callback);
 	},

 	register_custom_class_helper : function(){
 		Handlerbars.registerHelper('canvas',function(){
 			var canvas = "<canvas></canvas>";
 		});
 	},

 	add_and_create_template :function(){
 		var source = $("#"+this.template_id).html();
 		var template = Handlebars.compile(source);
 		var html = template(this.json);
 		console.debug(html);
 	}

 };