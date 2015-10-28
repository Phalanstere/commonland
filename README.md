# commonland

The idea of this package: It provides a socket.io layer that allows synchronized group interaction on a given website (events, chat, but also text input)
By this means one can think of collaborative writing / programming / website demonstrations.

# Using it conventionally

If you want to use it my embedding the files, you have to add the following files from the **lib** and **css** folder. You should alco incorporate the **img** folder.

```html
<link rel="stylesheet" type="text/css" href="css/commonplace.css">
<script src="https://cdn.socket.io/socket.io-1.2.1.js"></script>

<script src="lib/SocketClient.js"></script>
<script src="lib/commonplace.js">
```
Creating an instance looks like this, explained below.

```javascript
    var params = {};
    params.url      = 'http://127.0.0.1:3333';
    params.room     = "admin";
    var c = new common.Layer("logo", params);
```
To make us you have to start the socket.io server, that you find in the **sever** foilder (see below)


# Installation via npm

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