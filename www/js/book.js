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
    return "assets/"+this.id+"/pic"+this.id+"-"+this._pad(page)+".jpg";
  };



  /**
  * returns a string with left-padding with zeroes
  */
  Book.prototype._pad = function(num){
    var s = num+"";
    while (s.length < 3) s = "0" + s;
    return s;
  };


  return Book;

})();
