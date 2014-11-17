CuentaCuentos.Book = (function(){

  /**
  @constructor
  */
  var Book = function(id){
    this.id = id;
    this.tales  = [];
  };


  Book.prototype.addTale = function(tale){
    this.tales.push(tale);
  };

  return Book;

})();
