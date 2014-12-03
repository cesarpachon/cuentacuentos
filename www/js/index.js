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
       // app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
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
app.onDeviceReady();


$(document).bind("mobileinit", function(ev) {
  console.log("mobile init!");
  //here.. general configuration for jquery mobile, like apply themes
  //$.mobile.defaultPageTransition= "slide";
  //$.mobile.toolbar.prototype.options.addBackBtn = true;
  //$.mobile.toolbar.prototype.options.backBtnText = "Back";

  Cuentacuentos.init();

  app.page_books = new PageBooks();


  $("#goto_page_books").on("click", function(ev){
    app.page_books.enter();
    $(":mobile-pagecontainer").pagecontainer("change", "#page_books", { role: "page" , transition:"flip"});
  });

  $( "#page_books" ).pagecontainer({
    load: function( event, ui ) {
      console.log(" books loaded!" );
    }
  });


});


