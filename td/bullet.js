goog.provide('td.Bullet');

goog.require('lime.Circle')
goog.require('goog.math');

td.Bullet = function() {

    //call the parent contructor
    goog.base(this);
    
    this.setFill('#C6F022').setSize(5,7);
    
    this.speed = -0.2;
   
}

//td.Bullet inherits from lime.Circle
goog.inherits(td.Bullet,lime.Circle);
