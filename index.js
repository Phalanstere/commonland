var $           = require("jquery");
var common      = require("./npm_lib/commonplace.js");



$(document).ready(function(){
    "use strict";
    var params = {};
    params.url      = 'http://127.0.0.1:3333';
    params.room     = "admin";
    var c = new common.Layer("logo", params);

 });