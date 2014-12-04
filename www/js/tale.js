Cuentacuentos.Tale = (function(){

  /**
  @constructor
  */
  var Tale = function(id, title, pageini, pageend, next){
    this.id = id;
    this.pageini  = pageini;
    this.pageend = pageend;
    this.title = title;
    this.next = next;
  };


  /**
  * given an absolute page number that lies between pageini and pageend,
  * returns a value between 0 and 1 that represent the relative position
  * of that page within the tale
  */
  Tale.prototype.get_page_progress = function(page){
    return (this.pageend - page)/(this.pageened - this.pageini);
  };

  return Tale;

})();
