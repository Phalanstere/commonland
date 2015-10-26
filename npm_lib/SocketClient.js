var UserSocket = {};


UserSocket.Client = function(params)
{
var self = this;
this.established = false;

this.userlist = [];

this.disconnect = function () {
  self.socket.disconnect();  
  $("#toolbar #chat").hide();
  $("#toolbar #chatpanel").hide();
  // self.socket.emit('disconnect');
};


this.init = function() {
    window.socketClient = this;  
    self.socket = io.connect(params.url);

    self.socket.on('general_message', function(msg){
                
        if (msg.data.func)
            { 
            // alert("Hier kommt eine Funktion");   
                
            var temp = eval(msg.data.func);
            temp.call(this, msg.data);
            }
    });
    

    self.socket.on('greeting', function (msg) {

        self.established = true; // Kommunikation etabliert 
                
        if (params.user)
            {
            var user_info = {}; 
            user_info.id        = params.user._id;
            user_info.alias     = params.user.alias;
        
            $("#toolbar #chat").show();
                
            self.socket.emit('register_user', {data: user_info } );
            }


            

            
    });
    
    
    self.socket.on('chat_invitation', function(msg){
        
        var note = {};
        note.type = "chat_invitation";
        note.data = msg;
        _communicator.notification(note);
        // alert("Du hast eine Einladung zu einem Chat bekommen");      

    });
    
    
    self.socket.on('chat_message', function(msg){
        _communicator.chat_message(msg);
        }); 
    
    
    
    self.socket.on('user_list', function(msg){
        //_communicator.chat_message(msg);
        self.userlist = msg;
        });     

    
    
    
    self.socket.on('action', function (msg) {
        

        Botschaft = msg;
        // alert("Der Server sendet eine Aktion");
        var action = eval(msg.type.func);
        action.call(this, msg.type.type, msg.data);
        
        
    }); 

    
    };
    
// this broadcasts the message to all the logged-in users   
this.broadcast_data = function(data)
    {
    self.socket.emit('broadcast_data', {data: data} );
    };   
    
    
this.testfunction = function(params)
    {
    alert("Hallo " + params.type);  
    };   
    
    
self.init();    
    
}


