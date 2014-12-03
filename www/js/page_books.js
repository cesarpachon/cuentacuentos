var PageBooks = (function(){
  "use strict";

  /**
  * @constructor
  */
  PageBooks = function(){

  };


  /**
  * populate the books covers with an animation
  */
  PageBooks.prototype.enter = function(){
    var $page = $("#page_books");
    var $books = $page.find("#books");
    $books.empty();

    var self = this;
    Cuentacuentos.books.forEach(function(book){
      self.append_book($books, book);
    });

  };


  PageBooks.prototype.append_book = function($books, book){

    var _book = "<li class='book' id='"
      +book.id+"'>"
      +"<img src='"+book.get_page_pic_path(0)+"'>"
      +"<p>"+book.id+"</p>"
      +"</li>";
    $books.append(_book);

  };



  PageBooks.prototype.leave = function(){
  };


  return PageBooks;

})($);
