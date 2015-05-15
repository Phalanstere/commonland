"use strict";
var http    = require("http"); 
    
var UserSocket = {};

UserSocket.Communication = function(app)
    {
    var self = this;
    self.io = null; // socket server
    
    self.clients = [];

    // if app is empty    
    this.start_http_server = function() {      
        app = http.createServer(function (request, response) { 
        }).listen(3333);
    
    };
    
    
    this.interaction = function() {
      self.sockets = self.io.sockets.on('connection', function (socket) {
            console.log("a new connection will be established");
            // self.new_client(socket);  
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
    


var comm = new UserSocket.Communication();
