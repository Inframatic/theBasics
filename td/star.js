goog.provide('td.Star');

goog.require('lime.Circle')
goog.require('goog.math');

td.Star = function() {

    //call the parent contructor
    goog.base(this);
    
    this.setAnchorPoint(0,0).setFill('#DFDFF0').setSize(2,2);
    
    var x = goog.math.uniformRandom(0,480);
    var y = goog.math.uniformRandom(0,320);
    
    this.setPosition(x,y);
}

//td.Star inherits from lime.Circle
goog.inherits(td.Star,lime.Circle);
