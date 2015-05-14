"use strict";

var Commonplace = {};



Commonplace.Layer = function(div) {
  
  var self = this;
  this.area = null;
  
  window.commonplace = this;
  
  this.identification = function(elem) {
    var id = $(elem).attr("id");
    if (id) {
        $("#statusbar").html("ID " + id);    
        }
    else
        {
        var cl = $(elem).attr("class");
        $("#statusbar").html("CLASS " + cl);
        }
      
    };
  
  
  this.bindRecursive = function(elem) {

   elem.mouseover(function(event){
    event.stopPropagation();
    
    self.identification(this);

    });

   elem.click(function(event){
    event.stopPropagation();
    var n = $(this).attr("id");   
    var name = "#" + n;
    alert(name);
    
    self.el = $._data($(name)[0], 'events') ;
    
    console.log(self.el);
    });
    
    

   
   elem.children().each(function () {
        var n = $(this).attr("id");
        if (!n) {
            n = $(this).attr("class");
            var x = $("." + n);
            self.bindRecursive(x);
            }
        else
            {
            var x = $("#" + n);
            self.bindRecursive(x);
            }        
        
        });
    };
  
  
  
  this.init = function() {
  
  if (!div) {
    
    alert("Das ist der Body");
       
    }
  else {
        self.area = document.getElementById(div);
       var name = "#" + div;
        
       self.el = $._data($(name)[0], 'events') ;

        
        
        if (!self.area) throw ( 'This is not a valid id' ); 
        else
            {
            self.list = $(name).children();
            alert(self.list.length);
                 
            for (var i = 0; i < self.list.length; i++) {
             
             var x = $(self.list[i]);
             self.bindRecursive( $(x));
            };


              
           /*     
            $(self.list).mouseover(function(){
                self.identification(this);
                });
            */
            }
        }
    
  };
  
    
  self.init();  
    
};
