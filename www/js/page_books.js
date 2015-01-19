var PageBooks = (function(){
  "use strict";

  /**
  * @constructor
  */
  var pageBooks = function(){
    Cuentacuentos._register(this);
    var self = this;
    $("#page_books").on("click", ".book", function(ev){
      self.on_book_clicked(ev.currentTarget.id);
  });

  };


  /**
  * populate the books covers with an animation
  */
  pageBooks.prototype.enter = function(){
    _clearlog();
    var $page = $("#page_books");
    var $books = $page.find("#books");
    $books.empty();

    var self = this;
    Cuentacuentos.books.forEach(function(book){
      self.append_book($books, book);
    });

    //$.mobile.changePage("#page_books");
    $(":mobile-pagecontainer").pagecontainer("change", "#page_books", { role: "page" , transition:"flip"});
     //$(":mobile-pagecontainer").pagecontainer("change", $("#page_books"));
  };

  /**
  *
  */
  pageBooks.prototype.append_book = function($books, book){
    console.log("pageBooks.append_book "+ book.id);
    app.getPictureFast(book.get_page_pic_path(0), function(imgdata){
      console.log("pageBooks.append_book "+ book.id + " loaded!");
      var _book = "<li class='book' id='"
        +book.id+"'>"
        +"<img src='"+imgdata+"'>"
        +"<p>"+book.id+"</p>"
        +"</li>";
      var $book = $(_book);
      $books.append($book);
    });
  };

  /**
  *
  */
  pageBooks.prototype.on_book_clicked = function(bookid){
    console.log(bookid);
    Cuentacuentos._emit("show_book", bookid);
  };



  return pageBooks;

})();
