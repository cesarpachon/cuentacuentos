var PageBook = (function(){
  "use strict";

  /**
  * @constructor
  */
  PageBook = function(){
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
    var book = Cuentacuentos.get_book(bookid);

    //Cuentacuentos.books.forEach(function(book){
    //  self.append_book($books, book);
    //});

     $(":mobile-pagecontainer").pagecontainer("change", "#page_book", { role: "page" , transition:"flip"});

  };


  PageBook.prototype.append_tale = function($tales, tale){

/*    var _book = "<li class='book' id='"
      +book.id+"'>"
      +"<img src='"+book.get_page_pic_path(0)+"'>"
      +"<p>"+book.id+"</p>"
      +"</li>";
    var $book = $(_book);
    $books.append($book);
    $book.delay(Math.floor(Math.random()*2000)).fadeIn(Math.floor(Math.random()*1000));
*/
  };



  PageBook.prototype.leave = function(){
  };


  return PageBook;

})($);
