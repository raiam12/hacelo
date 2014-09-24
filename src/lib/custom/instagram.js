    /*
     *
     * Instagram class for getting entire things
     *
     */

    
     'use-strict';
    /*
     * Instagram constructor
     */
    window.Instagram = function(username){

      this.user_url = "https://api.instagram.com/v1/users/";
      this.client_id = "3a82fedae1534af2b582fe5133dec98c";
      this.redirect_uri="http://yahoo.com";
      this.url = "https://instagram.com/oauth/authorize/?client_id="+this.client_id+"&redirect_uri="+this.redirect_uri+"&response_type=token";
      this.access_token = "";
      this.username = "raiamquesada";
      this.user_id = "";
      this.img = "";
      this.tab = {};
      this.img_template = {"images":[]};
      this.canvas_width = $(window).width()-20;
      this.array_angular = [];

    };

    /*
     *
     * Instagram prototypal inheritance.
     *
     */
      window.Instagram.prototype = {

      init : function(){
        this.tab = window.open(encodeURI(this.url), '_blank', 'location=yes,clearcache=yes');
        this.bind_events();
      },

      bind_events : function(){
        var self = this;
        this.tab.addEventListener('loadstop', function(e){
          var el = e.url.split("access_token=");
          if(typeof el[1] != undefined){
            self.access_token = el[1];
          }
          self.found_access_code(el);
        });
      },

      fetch : function(url, data, callback){
        var self = this;
        $.ajax({
          url: url,
          type: 'GET',
          data:data,
          crossDomain: true,
          dataType: 'jsonp',
          jsonpCallback:'callback',
          success: function(e) { callback(e, self); },
          error: function(jqXHR, textStatus, errorThrown ) { console.debug(jqXHR);console.debug(errorThrown); }
        });
      },

      insert_images : function(response , self){
        console.debug(response);
        var array = new Array(), 
            obj = new Object(),
            img = '',
            counter = 0,
            count = '',
            img_encode = null;

            for(var els = 0;els<response.data.length;els++){
                obj = {"url":response.data[els].images.standard_resolution};
                array.push(obj);
                img+="<img class='img_test' src='"+response.data[els].images.standard_resolution.url+"' id='image_id_"+counter+"'/>"         
                counter++;
            }
            self.img_template["images"] = array;
            $(img).appendTo(".images-hidden");

            setTimeout(function(){
              count = $(".img_test").length;
              img_encode = $(".img_test");
              for(var x = 0; x < count;x++){
                self.array_angular.push(self.convert_img_to_encode(img_encode[x].id));
              }
              self.createEvent('finish',self.array_angular);
            },400);
      },

      get_user_id : function(data, scope){
        var self = scope; 
        self.user_id = data.data[0].id;
        self.fetch("https://api.instagram.com/v1/users/"+self.user_id+"/media/recent",'access_token='+self.access_token,self.insert_images);
      },

      found_access_code : function(data){
          if(data.length == 2){
            this.tab.close();
            this.fetch('https://api.instagram.com/v1/users/search',"q="+this.username+"&access_token="+this.access_token,this.get_user_id);
          }
      },
      
      convert_img_to_encode : function(id){
        var img = document.getElementById(id);
        var canvas = document.createElement("canvas");
        var height, width, ratio;
        width = img.width;
        height = img.height;
        ratio = width/height;
        ratio = this.canvas_width/ratio;
        canvas.width = this.canvas_width;
        canvas.height = ratio;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0,this.canvas_width,ratio);
        $(canvas).appendTo(".images-hidden");
        window.dataURL = canvas.toDataURL("image/png");
        $('<img src="'+window.dataURL+'"/>').appendTo(".images-hidden");
        return window.dataURL;
      },

      createEvent : function(text,data){
        var event;
          if(data !=undefined){
            event = new CustomEvent(text,{'detail':data});
          }else {
            event = new CustomEvent(text);
          }
          document.dispatchEvent(event);
      }

    };

    
    window.Instagram = window.Instagram || {};
