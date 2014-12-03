
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
      console.log("done!", data);
      Cuentacuentos._parse_books(data);
    });
  };



  //-- private functions ---

  /**
  * populates the Cuentacuentos.books array with instances of Book class.
  */
  Cuentacuentos._parse_books = function(data){
    data.books.forEach(function(_book){
      console.log(_book.id);
      Cuentacuentos.books.push(new Cuentacuentos.Book(_book.id));
    });
  };


  return Cuentacuentos;

})($);
