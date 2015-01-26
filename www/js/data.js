
//global namespace
var Cuentacuentos  = (function(){
  "use strict";

  var Cuentacuentos = {};


  Cuentacuentos.books = [];

  Cuentacuentos.tales = [];



  //---public functions -----------


	/**
	* parse the json database.
	*/
  Cuentacuentos.init = function(data){

    Cuentacuentos._parse_books(data);
      Cuentacuentos._parse_tales(data);

  };


  /**
  *
  */
  Cuentacuentos.get_book = function(bookid){
    var id = parseInt(bookid.substring("cuentacuentos".length)) - 1;
    var book = Cuentacuentos.books[id];
    return book;
  };



  /**
  * given a taleid, find the book object that contains it
  */
  Cuentacuentos.get_book_by_tale = function(taleid){
    var _book = null;


    Cuentacuentos.books.forEach(function(book){
      book.tales.forEach(function(tale){
        if(tale.id === taleid){
          _book = book;
        }
      });
    });
    return _book;
  };


  //-- private functions ---

  /**
  * populates the Cuentacuentos.books array with instances of Book class.
  */
  Cuentacuentos._parse_books = function(data){
    data.books.forEach(function(_book){
      Cuentacuentos.books.push(new Cuentacuentos.Book(_book.id));
    });
  };


  /**
  *
  */
  Cuentacuentos._parse_tales = function(data){
    data.tales.forEach(function(_tale){
      var book = Cuentacuentos.books[_tale.book - 1];
      var tale = new Cuentacuentos.Tale(_tale.id, _tale.title, _tale.pagini, _tale.pagend, _tale.next);
      book.add_tale(tale);
      Cuentacuentos.tales.push(tale);
    });
  };



  /**
  * returns a string with left-padding with zeroes
  */
  Cuentacuentos._pad = function(num){
    var s = num+"";
    while (s.length < 3) s = "0" + s;
    return s;
  };


  return Cuentacuentos;

})($);
