"use strict";
var http    = require("http"); 
var util    = require("util");
    
var UserSocket = {};

UserSocket.Server = function(app)
    {
    var self = this;
    self.io = null; // socket server
    
    self.clients = [];

    // if app is empty    
    this.start_http_server = function() {      
        app = http.createServer(function (request, response) { 
        }).listen(3333);
    
    };
    
    
    this.new_client = function(socket) {
       
      self.clients.push(socket);
      console.log("a new client " + self.clients.length); 
    };
    
    
    this.registered_users = [];
    
    this.get_user_data = function() {
        var list = [];
        var i;  
  
            
        for (i = 0; i < self.registered_users.length; i++)
            {
            list.push( self.registered_users[i].data);  
            }   
        return list;    
     };
    


    this.register_user = function(socket, data)
        {
        var user = {};
        user.data       = data.data;
        user.socket     = socket;
        
        self.registered_users.push(user);   
        console.log("Länge des Arrays " + self.registered_users.length);
        
        var users = self.get_user_data();
        socket.broadcast.emit('user_list', users);
        socket.emit('user_list', users);
        };
        
      this.unregister_user = function(socket) {
        var list = []; 
        var i;
            
        for (i = 0; i < self.registered_users.length; i++)
            {   
            var el = self.registered_users[i];
            if (el.socket != socket) list.push(el);
            }   
            
        self.registered_users = list;
        console.log("NUTZER ENTFERNT, ANWESEND " + list.length);
        
        var users = self.get_user_data();
        socket.broadcast.emit('user_list', users);
        };


    
    
    
    this.interaction = function() {
      // connection  
      self.sockets = self.io.sockets.on('connection', function (socket) {
            console.log("a new connection will be established");
            
            socket.emit('greeting', {'data': 'Hi!'});
            
            ////// user registers
     
            socket.on('register_user', function(data){
                console.log("the user registers");
                self.register_user(socket, data);
                
            });
     
            // user quits connection
            socket.on('disconnect', function () { 
                self.unregister_user(socket);
              });   
           
           //// END          
            
            // here a general broadcast is transmitted
            socket.on('broadcast_data', function(data){
                console.log("general broadcast");
                socket.broadcast.emit('general_message', data);
            });
            
            
             
            });   
            

     
    };
    
        
    this.init = function()
        {
        if (! app) { self.start_http_server(); }
   
        console.log("Socket.IO server starts"); 
        self.io = require('socket.io').listen(app);
        
        self.interaction();
        };
        
    self.init();    
        
    };
    


// var comm = new UserSocket.Communication();


module.exports = exports = UserSocket; 
