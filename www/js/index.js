var app = {

  filesystem: null,

  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {

    var self = this;

    //data may come as jquery ajax call or from the device external storage system..

    var data;
    var datapath = "cuentacuentos/cuentacuentos.json";


    _log("testing sd paths..");

    _log("cordova.file.externalDataDirectory: ", cordova.file.externalDataDirectory);



    _log("before querying filesystem");


    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;



    function onFail(message) {
      _log('Failed because: ' + message);
    }

    function gotFS(fileSystem) {
      self.filesystem = fileSystem;
      _log("gotFs ..", fileSystem);
      self.filesystem.root.getFile(datapath, {create: false}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
      _log("gotFileEntry ..", fileEntry);
      fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
      _log("gotFile .." + file);
      readDataUrl(file);
    }

    function readDataUrl(file) {
      _log("readDataUrl .." + file);
      var reader = new FileReader();
      reader.onloadend = function(evt) {
        _log("Read as data URL");
        //_log(evt.target.result);
        Cuentacuentos.init(JSON.parse(evt.target.result));
      };
      reader.readAsText(file);
    }

    function fail(evt) {
      _log(evt.target.error.code);
    }

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, onFail);

  },

  /**
  it works, but is too slow!!!
  * returns the width, height and dataasURL of the given resource (picture) through a callback.
  * (it is the binary content of the file as a encoded string)
  it  this.filesystem is not  initializated, load the picture using a Image object and extract the encoded content
  */
  getPictureSlow: function(url, cbdone){

    _log("app.getPictureSlow: getResource "+ url);

    function _error(evt){_log(JSON.stringify(evt));};

    if(!this.filesystem){
      _log("app.getPictureSlow: no filesystem. loading from relative url as Image");

      var img = new Image();
      img.onload = function(){

        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        var dataURL = canvas.toDataURL("image/jpg");
        canvas = null;

        _log("app.getPictureSlow: got ", this.width, this.height, dataURL);

        cbdone(this.width, this.height, dataURL);
      };

      img.src = url;

    }
    else{
      _log("app.getPictureSlow:  loading from filesystem "+ url);

      this.filesystem.root.getFile(url, {create: false}, function(entry){
        _log("app.getPictureSlow:  loading from filesystem, got entry "+ entry);

        entry.file(function(file){
          _log("app.getPictureSlow:  loading from filesystem, got entry.file "+ entry.file);

          var reader = new FileReader();
          reader.onloadend = function(evt){
            _log("app.getPictureSlow:  loading from filesystem, got reader evt "+ evt);

            //todo: how to get the width and height?
            var img = new Image();
            img.onload = function(){
              _log("app.getPictureSlow: trying to extract w,h from encoded image");
              cbdone(this.width, this.height, evt.target.result);
            }
            img.src = evt.target.result;
          }
          reader.readAsDataURL(file);
        }, _error);
      }, _error);
    }
  },

  /**
  * it just returns the native url of the picture. no width nor height.
  */
  getPictureFast: function(url, cbdone){

    _log("app.getPictureFast: getResource "+ url);

    function _error(evt){_log(JSON.stringify(evt));};

    if(window.cordova){
      _log("app.getPictureFast: getResource "+cordova.file.externalRootDirectory + url);
      window.resolveLocalFileSystemURL( cordova.file.externalRootDirectory + url, function(fileEntry){
        _log("app.getPictureFast:  got filesystem "+ JSON.stringify(fileEntry));
        cbdone(fileEntry.nativeURL);
      }, _error);
    }else{
      cbdone(url);
    }

  },



  /**
  *
  failed approaches:


  1. using the file api to get the content as base64 encoded string (it works for pictures, but is too slow..)

   function _error(evt){_log(JSON.stringify(evt));};

    if(!this.filesystem){
      _log("app.getSound: no filesystem. loading from relative url as path");
      cbdone(url);
    }
    else{
      _log("app.getSound:  loading from filesystem ", url);

      this.filesystem.root.getFile(url, {create: false}, function(entry){
        _log("app.getSound:  loading from filesystem, got entry ", entry);

        entry.file(function(file){
          _log("app.getSound:  loading from filesystem, got entry.file ", entry.file);

          var reader = new FileReader();
          reader.onloadend = function(evt){
            _log("app.getSound:  loading from filesystem, got reader evt ", evt);
            cbdone(evt.target.result);
          }
          reader.readAsDataURL(file);

        }, _error);
      }, _error);
    }

  2. createObjectURL.
             var url = window.URL.createObjectURL(entry.file);
          _log("app.getSound: url: ", url);
          cbdone(url);

          I got this error:
          file:///android_asset/www/cordova.js: Line 1060 : processMessage failed: Stack: TypeError: Type error
            D/CordovaLog( 1497):     at file:///android_asset/www/js/index.js:159:32
            D/CordovaLog( 1497):     at win (file:///android_asset/www/plugins/org.apache.cordova.file/www/FileEntry.js:72:9)
            D/CordovaLog( 1497):     at Object.cordova.callbackFromNative (file:///android_asset/www/cordova.js:293:54)
            D/CordovaLog( 1497):     at processMessage (file:///android_asset/www/cordova.js:1054:21)
            D/CordovaLog( 1497):     at androidExec.processMessages (file:///android_asset/www/cordova.js:1091:13)
            D/CordovaLog( 1497): file:///android_asset/www/cordova.js: Line 1061 : processMessage failed: Message: S01 File644117798 {"lastModifiedDate":1419969712000,"fullPath":"\/cuentacuentos\/cuentacuentos01\/arboldezapatos.mp3","type":"audio\/mpeg","name":"arboldezapatos.mp3","size":4430126}

3. using the cordova media plugin


  *
  */
  getSound: function(url, cbdone){


    function _error(evt){_log(JSON.stringify(evt));};

    //solves to: file:///storage/sdcard/cuentacuentos/cuentacuentos01/gobolino01.mp3


    if(window.cordova){
      _log("app.getSound: getResource "+cordova.file.externalRootDirectory + url);

    window.resolveLocalFileSystemURL( cordova.file.externalRootDirectory + url, function(fileEntry){
      _log("app.getSound:  got filesystem "+ JSON.stringify(fileEntry));
      cbdone(fileEntry.nativeURL);
      /*var my_media = new Media(fileEntry.localURL, function(){
        _log("success!");
      }, _error);

      my_media.play();
      */
    }, _error);
    }else{
      cbdone(url);
    }

  }

}; //end of object



app.initialize();

//hack
//app.onDeviceReady();

//let's try to detect if running on browser..
if(!window.cordova){


  $.getJSON( "cuentacuentos/cuentacuentos.json", function(data){
    Cuentacuentos.init(data);
  });
}


$(document).bind("mobileinit", function(ev) {
  _log("mobile init!");
  //here.. general configuration for jquery mobile, like apply themes
  //$.mobile.defaultPageTransition= "slide";
  //$.mobile.toolbar.prototype.options.addBackBtn = true;
  //$.mobile.toolbar.prototype.options.backBtnText = "Back";

  //disabling transitions?
  $.mobile.defaultPageTransition   = 'none';
  $.mobile.defaultDialogTransition = 'none';

  $( ":mobile-pagecontainer" ).pagecontainer({
    beforechange: function( event, ui ) {console.log("beforechange"+ JSON.stringify(ui));},
    beforehide: function( event, ui ) {console.log("beforechange"+ JSON.stringify(ui));},
    beforeload: function( event, ui ) {console.log("beforechange"+ JSON.stringify(ui));},
    beforeshow: function( event, ui ) {console.log("beforechange"+ JSON.stringify(ui));},
    beforetransition: function( event, ui ) {console.log("beforechange"+ JSON.stringify(ui));},
    change: function( event, ui ) {console.log("beforechange"+ JSON.stringify(ui));},
    changefailed: function( event, ui ) {console.log("beforechange"+ JSON.stringify(ui));}
  });


  app.page_books = new PageBooks();
  app.page_book = new PageBook();
  app.page_tale = new PageTale();


  $("#goto_page_books").on("click", function(ev){
    _log("go to page books!");
    app.page_books.enter();

  });

  $( "#page_books" ).pagecontainer({
    load: function( event, ui ) {
      _log(" books loaded!" );
    }
  });


});

var _logbuffer = "";

/**
* temp utilitary function. append a p tag to the DOM
*/
_log  = function(msg){
  console.log(msg);
  _logbuffer += "<p>"+msg+"</p>";
  $("div#log").html(_logbuffer);
};

_clearlog = function(){
  _logbuffer = "";
  $("div#log").empty();
}
