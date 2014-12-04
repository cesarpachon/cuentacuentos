var PageTale = (function(){
  "use strict";

  /**
  * @constructor
  */
  var pageTale = function(){
    Cuentacuentos._register(this);
    this.current_book = null;

    var self = this;
    /*$("#page_tale").on("click", ".book", function(ev){
      self.on_book_clicked(ev.currentTarget.id);
  });*/

  };


  /**
  * populate the page list, the audio list and the page preview
  * @params book {object} a book object
  *@params taleid {string} id of the tale to show
  */
  pageTale.prototype.on_cmd_show_tale = function(book, taleid){

    this.current_book = book;
    this.current_tale = book.get_tale(taleid);

    var $page = $("#page_tale");

    //populate the pages preview
    var $pages = $page.find("#pages");
    $pages.empty();

    for(var i=this.current_tale.pageini; i<=this.current_tale.pageend; ++i){
      this.append_page($pages, i);
    };


    //load the first page of the tale
    this.view_page(this.current_tale.pageini);

    //load the audio


    $(":mobile-pagecontainer").pagecontainer("change", "#page_tale", { role: "page" , transition:"flip"});
  };


  pageTale.prototype.view_page = function(page){

     var $page = $("#page_tale");
     var $active_page_img = $page.find("img#active_page_img");
     var pagepath = this.current_book.get_page_path(page);
    console.log("pagepath:", pagepath);
    $active_page_img.attr("src", pagepath);

  };


  /**
  *
  */
  pageTale.prototype.append_page = function($pages, page){
    var _page = "<li class='book' id='"
      +page+"'>"
      +"<img src='"+this.current_book.get_page_pic_path(page)+"'>"
      +"</li>";
    var $page = $(_page);
    $pages.append($page);
    $page.delay(Math.floor(this.current_tale.get_page_progress(page)*2000)).fadeIn(500);
  };

  /**
  *
  */
  pageTale.prototype.on_page_clicked = function(bookid){
    console.log(bookid);
  };


  return pageTale;

})($);
