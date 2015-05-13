 "use strict";

var Commonplace = {};



Commonplace.Layer = function(div) {
  
  var self = this;
  this.area = null;
  
  
  this.init = function() {
  
  if (!div) {
    
    alert("Das ist der Body");
       
    }
  else {
        self.area = document.getElementById(div);
        
        eventListenerData = $._data("#Button1", "events");
        
        
        if (!self.area) {
            throw ( 'This is not a valid id' );    
            }
        else
            {
             if (self.area.click ) alert("Hier gibt es einen Klick");   
            }
        }
    
  };
  
    
  self.init();  
    
};
