var app = {
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

      //data may come as jquery ajax call or from the device external storage system..

      //$.getJSON( "assets/cuentacuentos.json", function( data ) {
      //});
      var data;
      //cordova.file.externalRootDirectory/
      var datapath = "cuentacuentos/cuentacuentos.json";

      _log("before querying filesystem");

      window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;



     function onFail(message) {
      _log('Failed because: ' + message);
    }

       function gotFS(fileSystem) {
         _log("gotFs ..", fileSystem);
        fileSystem.root.getFile(datapath, {create: false}, gotFileEntry, fail);
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
           _log(evt.target.result);
        };
        reader.readAsDataURL(file);
    }

    function fail(evt) {
        _log(evt.target.error.code);
    }


      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, onFail);

      //Cuentacuentos.init(data);

      /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        */
    }
};

app.initialize();

//hack
//app.onDeviceReady();


$(document).bind("mobileinit", function(ev) {
  _log("mobile init!");
  //here.. general configuration for jquery mobile, like apply themes
  //$.mobile.defaultPageTransition= "slide";
  //$.mobile.toolbar.prototype.options.addBackBtn = true;
  //$.mobile.toolbar.prototype.options.backBtnText = "Back";

  app.page_books = new PageBooks();
  app.page_book = new PageBook();
  app.page_tale = new PageTale();


  $("#goto_page_books").on("click", function(ev){
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

