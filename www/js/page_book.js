var PageBook = (function(){
  "use strict";

  /**
  * @constructor
  */
  PageBook = function(){
    this.current_book = null;
    Cuentacuentos._register(this);
    $("#page_book").on("click", ".tale", function(ev){
    console.log(ev.currentTarget.id);
  });

  };


  /**
  * populate the books covers with an animation
  */
  PageBook.prototype.on_cmd_show_book = function(bookid){
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


  PageBook.prototype.append_tale = function($tales, tale){

    var _tale = "<li class='tale' id='"
      +tale.id+"'>"
      +"<img src='"+this.current_book.get_page_pic_path(tale.pageini)+"'>"
      +"<p>"+tale.title+"</p>"
      +"</li>";
    var $tale = $(_tale);
    $tales.append($tale);
    $tale.delay(Math.floor(Math.random()*2000)).fadeIn(Math.floor(Math.random()*1000));

  };



  PageBook.prototype.leave = function(){
  };


  return PageBook;

})($);
