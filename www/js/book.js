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
    return "cuentacuentos/"+this.id+"/pic"+this.id+"-"+Cuentacuentos._pad(page)+".jpg";
  };

  /**
  * returns the path for the given page in high res
  */
  Book.prototype.get_page_path = function(page){
    return "cuentacuentos/"+this.id+"/"+this.id+"-"+Cuentacuentos._pad(page)+".jpg";
  };


 /**
  * returns the path for the audio of the given tale
  */
  Book.prototype.get_audio_path = function(tale){
    return "cuentacuentos/"+this.id+"/"+tale.id+".mp3";
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


  /**
  *
  */
  Book.prototype.get_title = function(){
    return "cuentacuentos "+this.id.substr("cuentacuentos".length);
  };



  return Book;

})();
