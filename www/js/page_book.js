var PageBook = (function(){
  "use strict";

  /**
  * @constructor
  */
  var pageBook = function(){
    this.current_book = null;
    Cuentacuentos._register(this);
    var self = this;
    $("#page_book").on("click", ".book", function(ev){
      self.on_tale_clicked(ev.currentTarget.id);
  });

  };


  /**
  * populate the books covers with an animation
  */
  pageBook.prototype.on_cmd_show_book = function(bookid){
    _clearlog();
    console.log("PageBook on_cmd_show_book " + bookid);
    var $page = $("#page_book");
    var $tales = $page.find("#tales");
    $tales.empty();

    var self = this;
    this.current_book = Cuentacuentos.get_book(bookid);

    $page.find("h1").html(this.current_book.get_title());

    this.current_book.tales.forEach(function(tale){
      self.append_tale($tales, tale);
    });

     $(":mobile-pagecontainer").pagecontainer("change", "#page_book", { role: "page" , transition:"flip"});

  };


  /**
  *
  */
  pageBook.prototype.append_tale = function($tales, tale){

    app.getPictureFast(this.current_book.get_page_pic_path(tale.pageini), function(imgdata){
    var _tale = "<li class='book' id='"
      +tale.id+"'>"
      +"<img src='"+imgdata+"'>"
      +"<p>"+tale.title+"</p>"
      +"</li>";
    var $tale = $(_tale);
    $tales.append($tale);
    });

  };

 /**
  *
  */
  pageBook.prototype.on_tale_clicked = function(taleid){
    console.log(taleid);
    Cuentacuentos._emit("show_tale", this.current_book, taleid);
  };



  return pageBook;

})($);
