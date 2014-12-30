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
  * returns the dataasURL of the given resource. assumes that this.filesystem is initializated
  */
  getResource: function(url, cbdone){

    console.log("index.js getResource "+ url);

    function _error(evt){_log(JSON.stringify(evt));};

    this.filesystem.root.getFile(url, {create: false}, function(entry){
      entry.file(function(file){
        var reader = new FileReader();
        reader.onloadend = function(evt){
          cbdone(evt.target.result);
        }
        reader.readAsDataURL(file);
      }, _error);
    }, _error);
  }

};



app.initialize();

//hack
//app.onDeviceReady();

//let's try to detect if running on browser..
if(!window.cordova){

  $.ajax({
    url: "assets/cuentacuentos.json",
    context: document.body
    }).done(function() {
    $( this ).addClass( "done" );
    });

  Cuentacuentos.init(JSON.parse());
}


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

