goog.provide('td.Player');

goog.require('lime.Sprite')
goog.require('td.Bullet');

td.Player = function() {

    //call the parent contructor
    goog.base(this);
    
    this.setFill('img/rocket.png').setSize(40,70);
    
    this.bullets = [];
}

//td.Player inherits from lime.Sprite
goog.inherits(td.Player,lime.Sprite);