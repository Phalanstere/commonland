# commonland

The idea of this package. To create a socket.io layer that allows synchronized group interaction on a given website (events, but also a chat)

# installation via npm

```javascript
	npm install common-land
```

## Server

To require the library, you write:

```javascript
var common = require("node_modules/common-land/server/commonland_server.js");
```

To start an instance, you may pass an http server as an argument or leave the parameter empty.
Then the socket.io Server will be started on port 3333


```javascript
 var socket = new common.Server();   
```


## Client

Client side, you create an index.js file that might look like this:

```javascript
var $           = require("jquery");
var common      = require("common-land");



$(document).ready(function(){
    "use strict";
    var params = {};
    params.url      = 'http://127.0.0.1:3333';
    params.room     = "admin";
    var c = new common.Layer("logo", params);

 });
```

- the **params.url** 	takes the url and port information where the server is running
- the **params.room**   create the room that holds your users
 
- the first parameter of the object holds the dom element on which contains the elements that shall be shared, the second the server parameters


### icons

- Daouna Jong, collaboration
- Stefano Vetere, chat
- Hrag Chanchanian, exit
- Rohit M. S., record
- BaveBros, play