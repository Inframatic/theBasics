goog.provide('td.Enemy');

goog.require('lime.Sprite')
goog.require('goog.math');
goog.require('td.Bullet');
goog.require('lime.fill.Frame');
goog.require('lime.animation.KeyframeAnimation');



td.Enemy = function() {

    //call the parent contructor
    goog.base(this);
    this.setSize(60,30);
    
    //animated enemy
    var frame1 = new lime.fill.Frame('img/enemy_anim.png',0,0,60,30); //x, y, width, height
    var frame2 = new lime.fill.Frame('img/enemy_anim.png',60,0,60,30); //x, y, width, height
    var frame3 = new lime.fill.Frame('img/enemy_anim.png',120,0,60,30); //x, y, width, height
    var frame4 = new lime.fill.Frame('img/enemy_anim.png',180,0,60,30); //x, y, width, height
    
    var animated_sprite = new lime.animation.KeyframeAnimation().setDelay(0.5).
        addFrame(frame1).
        addFrame(frame2).
        addFrame(frame3).
        addFrame(frame4);
    
    this.runAction(animated_sprite);
    
    
    var x = goog.math.uniformRandom(0,480);
    var y = goog.math.uniformRandom(0,120);
    
    this.setPosition(x,y);
    
    //make it move
    lime.scheduleManager.schedule(function(dt) {
        current_x = this.getPosition().x;
        current_y = this.getPosition().y;
        
        speed_x = goog.math.uniformRandom(-0.1,0.1);
        speed_y = goog.math.uniformRandom(0.01,0.02);
        
        //check for borders
        new_pos_x = current_x+speed_x*dt;
        
        if(new_pos_x < 0)
            new_pos_x = 0;
        
        if(new_pos_x > 480)
            new_pos_x = 480;
        
        this.setPosition(new_pos_x,current_y+speed_y*dt);       
        
    }, this);
    
}

//td.Enemy inherits from lime.Sprite
goog.inherits(td.Enemy,lime.Sprite);