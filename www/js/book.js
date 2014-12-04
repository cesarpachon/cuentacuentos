Cuentacuentos.Book = (function(){

  /**
  @constructor
  */
  var Book = function(id){
    this.id = id;
    this.tales  = [];
  };


  Book.prototype.add_tale = function(tale){
    this.tales.push(tale);
  };


  /**
  * returns the pic path for the given page
  */
  Book.prototype.get_page_pic_path = function(page){
    return "assets/"+this.id+"/pic"+this.id+"-"+Cuentacuentos._pad(page)+".jpg";
  };





  return Book;

})();
