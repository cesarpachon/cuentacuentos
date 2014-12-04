var PageBooks = (function(){
  "use strict";

  /**
  * @constructor
  */
  PageBooks = function(){
    Cuentacuentos._register(this);
    var self = this;
    $("#page_books").on("click", ".book", function(ev){
      self.on_book_clicked(ev.currentTarget.id);
  });

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

     $(":mobile-pagecontainer").pagecontainer("change", "#page_books", { role: "page" , transition:"flip"});
  };

  /**
  *
  */
  PageBooks.prototype.append_book = function($books, book){
    var _book = "<li class='book' id='"
      +book.id+"'>"
      +"<img src='"+book.get_page_pic_path(0)+"'>"
      +"<p>"+book.id+"</p>"
      +"</li>";
    var $book = $(_book);
    $books.append($book);
    $book.delay(Math.floor(Math.random()*2000)).fadeIn(Math.floor(Math.random()*1000));
  };

  /**
  *
  */
  PageBooks.prototype.on_book_clicked = function(bookid){
    console.log(bookid);
    Cuentacuentos._emit("show_book", bookid);
    //app.page_books.enter();
    ///$(":mobile-pagecontainer").pagecontainer("change", "#page_books", { role: "page" , transition:"flip"});
  };


  /**
  *
  */
  PageBooks.prototype.leave = function(){
  };


  return PageBooks;

})($);
