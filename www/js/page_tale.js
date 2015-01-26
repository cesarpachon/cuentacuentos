var PageTale = (function(){
  "use strict";


  var _map = null;
  var _layer = null;

  /**
  * @constructor
  */
  var pageTale = function(){
    Cuentacuentos._register(this);
    this.current_book = null;

    var self = this;
    $("#page_tale").on("click", ".book", function(ev){
      self.view_page(ev.currentTarget.id);
    });

    $("#page_tale").on("click", ".next", function(ev){
      self.view_next();
    });


  };


  /**
  * populate the page list, the audio list and the page preview
  * @params book {object} a book object
  *@params taleid {string} id of the tale to show
  */
  pageTale.prototype.on_cmd_show_tale = function(book, taleid){
    _clearlog();
    this.current_book = book;
    this.current_tale = book.get_tale(taleid);

    var $page = $("#page_tale");

    $page.find("h1").html(this.current_tale.title);

    //populate the pages preview
    var $pages = $page.find("#pages");
    $pages.empty();

    for(var i=this.current_tale.pageini; i<=this.current_tale.pageend; ++i){
      this.append_page($pages, i);
    };

    if(this.current_tale.next){
      $pages.append("<li class='next' >Continúa!</li>");
    };

    this.load_audio();

    this.view_page(this.current_tale.pageini);

    $(":mobile-pagecontainer").pagecontainer("change", "#page_tale", { role: "page" , transition:"flip"});
  };


  /**
  *
  */
  pageTale.prototype.view_page = function(page){

    var $page = $("#page_tale");
    var $container = $page.find(".active_page");
    $container.css("height", Math.floor(screen.height*0.8)+"px"/*$page.css("height")*/);

    var self = this;
    app.getPictureSlow(this.current_book.get_page_path(page), function(w, h, imgdata){
      self.init_leaf(w, h, imgdata);
    });

  };

  /**
  *
  */
  pageTale.prototype.view_next = function(){
    console.log("next: ", this.current_tale.next);
    var next = this.current_tale.next;
    var book = Cuentacuentos.get_book_by_tale(next);
    this.on_cmd_show_tale(book, next);
  };


  /**
  *
  */
  pageTale.prototype.init_leaf = function(w, h, url){

    if(!_map){
      // create the slippy map
      _map = L.map('image-map', {
        minZoom: 1,
        maxZoom: 4,
        center: [0, 0],
        zoom: 1,
        crs: L.CRS.Simple,
      });
    }


    // calculate the edges of the image, in coordinate space
    var southWest = _map.unproject([0, h], _map.getMaxZoom()-1);
    var northEast = _map.unproject([w, 0], _map.getMaxZoom()-1);
    var bounds = new L.LatLngBounds(southWest, northEast);

    // add the image overlay,
    // so that it covers the entire map

    if(_layer){
      _map.removeLayer(_layer);
    }

    _layer = L.imageOverlay(url, bounds).addTo(_map);

    // tell leaflet that the map is exactly as big as the image
    _map.setMaxBounds(bounds);
  };



  /**
  *
  */
  pageTale.prototype.append_page = function($pages, page){
    var self = this;
    app.getPictureFast(this.current_book.get_page_pic_path(page), function(imgdata){
      var _page = "<li class='book' id='"
      +page+"'>"
      +"<img src='"+imgdata+"'>"
      +"</li>";
      var $page = $(_page);
      $pages.append($page);
      //$page.fadeIn(500);
    });
  };

  /**
  *
  */
  pageTale.prototype.load_audio  = function(){


    app.getSound(this.current_book.get_audio_path(this.current_tale), function(audiodata){
      var $page = $("#page_tale");
      var $audio = $page.find("div#sound");
      _log($audio);
      $audio.empty();
      _log("adding audio tag with src "+ audiodata);

      var au = new Audio(audiodata);
      au.controls = true;
      $audio.append(au);

      //$audio.add("<audio src='"+audiodata+"' controls>HTML5 audio not supported</audio>");

      //$audio.attr("src", audiodata);
      //$audio.attr("src", "data:audio/mp3;base64,"+audiodata);
      //$audio.attr("type", "type/mp3");
    });
  };

    return pageTale;

  })($);
