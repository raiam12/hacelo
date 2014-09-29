var config_path = "partials/";
var nacion = angular.module("nacion",["ngRoute","ngAnimate"]);

nacion.config(["$routeProvider",
  function($routeProvider){
      $routeProvider.when('/',{

        templateUrl:config_path+'index.html',
        controller: 'nacion_controller'

      }).when('/imprimir',{
        templateUrl:config_path+'print.html',
        controller: 'nacion_controller'

      }).when('/more2',{
        templateUrl:config_path+'index.html',
        controller: 'nacion_controller'

      }).when('/photo',{
        templateUrl:config_path+'photo.html'

      }).when('/pick',{
        templateUrl:config_path+'pick.html',
        controller: 'pick_controller'

      }).when('/instagram',{
        templateUrl:config_path+'instagram.html',
        controller: 'pick_controller'

      }).when('/market',{
        templateUrl:config_path+'carrito.html',
        controller: 'nacion_market'

      }).otherwise({ redirectTo:function(){
          return 'failed';
        }
      });
}]);


nacion.service('nacion_service',function(){ 
  this.url = [];
  this.instagram_pictures = [];
  this.entire_ins_pics = [];
  this.orders = [];

  this.insert_url = function(url){
    this.url.push(url);
  };

  this.return_url = function(){
    return this.url;
  };

  this.set_entire_ins_pics = function(data){
    this.entire_ins_pics = data;
  };

  this.get_entire_ins_pics = function(data){
    return  this.entire_ins_pics;
  };

  this.insertInstagram_picture = function(data){
    this.instagram_pictures.push();
  };

  this.get_Instagram_picture = function(){
    return this.instagram_pictures;
  };

  this.return_order = function(){
    return this.orders;
  };

  this.add_order = function(order){
    this.orders.push(order);
  };

});

nacion.controller('nacion_market',['nacion_service','$scope',function(nacion_service, $scope){

  $scope.orders = nacion_service.return_order();

}]);

nacion.controller('nacion_controller',['nacion_service','$scope',function(nacion_service, $scope){
  //$scope.url = ["https://www.google.com/images/srpr/logo11w.png","https://www.google.com/images/srpr/logo11w.png"];
  $scope.url = nacion_service.return_url();
  $scope.data = "nacion_test";

  $scope.init_instagram = function(){
    var instagram_v = new Instagram();
      instagram_v.init();
  };

  $scope.insert_crop = function(url,event){

        var width = $("#"+event.toElement.id).width(),
            height = $("#"+event.toElement.id).height();

        dkrm = new Darkroom('#'+event.toElement.id, {
            minWidth: 0,
            minHeight: 0,
            maxWidth: width,
            maxHeight: height,
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
  };

  $scope.insert_url = function(url){
    nacion_service.insert_url(url);
    $scope.url = nacion_service.return_url();
  };

  document.addEventListener('finish',function(e){
    $scope.url = e.detail;
    $scope.$apply();
  });

}]);

nacion.controller("pick_controller",['nacion_service','$scope',function(nacion_service, $scope){
  $scope.instagram_pics = nacion_service.get_entire_ins_pics();
  $scope.instagram_images = [];
  $scope.normal_pics = [];
  $scope.username = '';
  $scope.instagram = null;
  var username_html = $(".username-hidden-field");

  $scope.call_instagram = function(){
    $scope.instagram = '';
    if($scope.username != ""){
          var instagramA = new Instagram($scope.username);
          instagramA.init();
          username_html.removeClass('reset_value');
    } else {
      hacelo.alert(messages["FILL"]);
    }
    
  };

  $scope.call_popup = function(){
    if($scope.instagram_pics.length>0){
          window.location.hash ="#/instagram"
    } else {
        username_html.addClass('reset_value');
    }
    
  };

  $scope.pick_song = function(index){
    if($scope.instagram_pics[index].picked){
      $scope.instagram_pics[index].picked = false;
    } else {
      $scope.instagram_pics[index].picked = true;
    }
  };

  document.addEventListener('_EMPTY',function(){
    nacion_service.set_entire_ins_pics(null);
    $scope.instagram_pics = nacion_service.get_entire_ins_pics();
  });


  /*
   * 
   */
  document.addEventListener('finish',function(e){
    $scope.instagram_pics = e.detail;
    var array = [];
    for (var el = 0;el<$scope.instagram_pics.length;el++){
      var obj  ={"img":$scope.instagram_pics[el],"picked":false};
      array.push(obj);
    }
    $scope.instagram_pics = array;
    nacion_service.set_entire_ins_pics($scope.instagram_pics);
    $scope.$apply();
    if($scope.instagram_pics.length >0){
      window.location.hash="#/instagram"
    }  
  });

}]);