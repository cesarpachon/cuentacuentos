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
    console.log("PageBook on_cmd_show_book " + bookid);
    var $page = $("#page_book");
    var $tales = $page.find("#tales");
    $tales.empty();

    var self = this;
    this.current_book = Cuentacuentos.get_book(bookid);

    this.current_book.tales.forEach(function(tale){
      self.append_tale($tales, tale);
    });

     $(":mobile-pagecontainer").pagecontainer("change", "#page_book", { role: "page" , transition:"flip"});

  };


  /**
  *
  */
  pageBook.prototype.append_tale = function($tales, tale){

    var _tale = "<li class='book' id='"
      +tale.id+"'>"
      +"<img src='"+this.current_book.get_page_pic_path(tale.pageini)+"'>"
      +"<p>"+tale.title+"</p>"
      +"</li>";
    var $tale = $(_tale);
    $tales.append($tale);
    $tale.delay(Math.floor(Math.random()*2000)).fadeIn(Math.floor(Math.random()*1000));

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
