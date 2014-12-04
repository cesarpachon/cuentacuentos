
//global namespace
var Cuentacuentos  = (function(){
  "use strict";

  var Cuentacuentos = {};


  Cuentacuentos.books = [];

  Cuentacuentos.tales = [];



  //---public functions -----------


	/**
	* load the json database
	*/
  Cuentacuentos.init = function(){

    console.log("data init");
    $.getJSON( "assets/cuentacuentos.json", function( data ) {
      Cuentacuentos._parse_books(data);
      Cuentacuentos._parse_tales(data);
    });
  };


  /**
  *
  */
  Cuentacuentos.get_book = function(bookid){
    var id = parseInt(bookid.substring("cuentacuentos".length)) - 1;
    var book = Cuentacuentos.books[id];
    return book;
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
      var tale = new Cuentacuentos.Tale(_tale.id, _tale.title, _tale.pageini, _tale.pageend, _tale.next);
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
