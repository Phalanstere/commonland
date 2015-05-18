"use strict";

var Commonplace = {};


Commonplace.Layer = function(div, params) {

  var self = this;
  this.area = null;
  window.commonplace = this;

  // checks whether it has an id or a class
  this.get_element = function(elem) {
    var n = $(elem).attr("id");
    if (!n) {
        n = $(elem).attr("class");
        var x = $("." + n);
        return x;
        }
    else
        {
        var x = $("#" + n);
        return x;
        }
  };

  this.click_event = function() {
      if (self.actual_element) {

        console.log(self.actual_element);
        var o = { type: 'click', element: self.active };

        self.event = o;
        
        // now the event get transmitted voa socket.io
        if (self.communication) {
            var data        = {};
            data.event      = o;
            data.func       = "window.collaborator.interaction";
            self.communication.broadcast_data(data);
            }

      }

  };


  // releases the actual_element
  this.release_identification = function(elem) {
      var x = self.get_element(elem);
      $("#statusbar").html("");
      self.actual_element = null;
  };

  // assigns the actual_element
  this.identification = function(elem) {
    var id = $(elem).attr("id");
    if (id) {
        self.actual_element = "#" + id;
        self.active         = self.actual_element; // why is there an active element? Because a given click could unfocus the actual_element
                                                   // generating a null object

        $("#statusbar").html(self.actual_element);
        }
    else
        {
        var cl = $(elem).attr("class");
        self.actual_element = "." + cl;
        self.active         = self.actual_element;

        $("#statusbar").html(self.actual_element);
        }

    };

  // mouseover and mouseout evevents
  this.bindRecursive = function(elem) {

   elem.mouseover(function(event){
    event.stopPropagation();
    self.identification(this);
    });

   elem.mouseout(function(event){
    event.stopPropagation();
    self.release_identification(this);
    });



   elem.children().each(function () {
       var x = self.get_element(this);
       self.bindRecursive(x);
        });
    };



  this.show_collaboration_panel = function() {
    $("#collaboration_panel").fadeIn();
  };

 this.disconnect = function() {
   if (self.communication) self.communication.disconnect();
 };


  this.paint_toolbar = function() {
      var s = "";
      s += '<div id = "toolbar">';
      
        s += '<div id = "connect" class = "icon"><img src = "img/collaboration.svg"/></div>';
        s += '<div id = "disconnect" class = "icon"><img src = "img/close.svg"/></div>';
        s += '<div id = "chat" class = "icon"><img src = "img/chat.svg"/></div>';
        
        s += '<div id = "chatpanel">';
            s += '<div id = "chatarea"></div>';
            s += '<input id = "chatinput" name="vorname" type="text" value="TYPE - confirm with RETURN">';

        s += '</div>';
        

        
      s += '</div>';
       
      s += '<div id = "collaboration_panel">';
        s += '<div class = "exit">&#x274c</div>';
        s += '<div class = "legend">USERNAME</div>';
        s += '<input id = "username" class = "user" name="vorname" type="text" value="TYPE IN YOUR NAME - confirm with RETURN">';
      s += '</div>';
        
      $("body").append(s);
      
      $("#toolbar #connect").click(function(){
         if (! self.user) self.show_collaboration_panel();
      });

      $("#toolbar #disconnect").click(function(){
         self.disconnect();
         self.communication = null;
      });
      

      $("#toolbar #chat").click(function(){
        var v = $("#chatpanel").css("display");
        
        if (v === "none" ) {  $("#chatpanel").show(); } 
        else               { $("#chatpanel").hide();  }
      });
      
      
      $("#chatinput").change(function() {
         var data   = {};
         var temp    =  $(this).val();
         data.func  = "window.collaborator.msg";
          
         $(this).val(""); 
         
         var s = '<div class = "chatmessage">';
            s += '<span class = "chatcontributor">' + params.user.alias + ':</span>';
            s += '<span class = "chatcontent">' + temp + '</span>';            
         s += '</div>';

         $("#chatarea").prepend(s);
         
         data.msg = s;
         
         
         self.communication.broadcast_data(data);
         });
      
      $("#chatinput").click(function() {
         $(this).val(""); 
         });
      


      $("#collaboration_panel .exit").click(function(){
         $("#collaboration_panel").fadeOut();
        });

      $("#username").click(function(){
        $(this).val("");
      });   
      
      $("#username").change(function(){

        params.user = {};
        params.user._id  = null;
        params.user.alias = $(this).val();
        $("#collaboration_panel").fadeOut();
        
        self.connect();
        
      });      
      
  };  

 // socket.io generated chat message
 this.msg = function(data) {
    $("#chatarea").prepend(data.msg);
 };


// socket.io generated interaction
this.interaction = function(data) {
  console.log("eine Interaktion " + data.event.type + "auf dem Element " + data.event.element);  
  
  var s = '$("' + data.event.element + '").' + data.event.type + '()';
  eval(s);
};




  this.connect = function() {

    if (! self.communication) {
        self.communication = new UserSocket.Client(params);
        }

  };


  // initialization
  this.init = function() {
    window.collaborator = self;  
      
    self.paint_toolbar();  



  if (!div) {

    alert("Das ist der Body");

    }
  else {
       self.area = document.getElementById(div);
       var name = "#" + div;
       $(name).click(function(){
          self.click_event();
       });

        if (!self.area) throw ( 'This is not a valid id' );
        else
            {
            self.list = $(name).children();
            for (var i = 0; i < self.list.length; i++) {
                var x = $(self.list[i]); // class or id
                self.bindRecursive( $(x));
                }

            }
        }

  };


  self.init();

};
