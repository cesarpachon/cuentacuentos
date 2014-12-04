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

  /**
  * returns the path for the given page in high res
  */
  Book.prototype.get_page_path = function(page){
    return "assets/"+this.id+"/"+this.id+"-"+Cuentacuentos._pad(page)+".jpg";
  };

  /**
  *
  */
  Book.prototype.get_tale = function(taleid){
    for(var i=0; i<this.tales.length; ++i){
      if(this.tales[i].id === taleid){
        return this.tales[i];
      }
    }
    return null;
  };




  return Book;

})();
