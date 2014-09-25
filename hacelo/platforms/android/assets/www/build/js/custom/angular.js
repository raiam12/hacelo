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

      }).otherwise({ redirectTo:function(){
          return 'failed';
        }
      });
}]);


nacion.service('nacion_service',function(){ 
  this.url = [];

  this.insert_url = function(url){
    this.url.push(url);
  };

  this.return_url = function(){
    return this.url;
  }

});

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

  $scope.call_instagram = function(){
    alert('click');
  };

}]);