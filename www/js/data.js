
//global namespace
var Cuentacuentos  = (function(){
  "use strict";

  var Cuentacuentos = {};


  Cuentacuentos.books = [];

  //Data.tales = [];



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
      var book = Cuentacuentos.books[_tale.id - 1];
      var tale = new Tale(_tale.);
    });
  };





  return Cuentacuentos;

})($);
