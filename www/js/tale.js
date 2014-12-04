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

  return Tale;

})();
