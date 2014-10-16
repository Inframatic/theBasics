//set main namespace
goog.provide('td');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.Layer');
goog.require('lime.fill.LinearGradient');
goog.require('goog.math');
goog.require('td.Star');
goog.require('td.Player');
goog.require('td.Bullet');
goog.require('td.Enemy');
goog.require('lime.animation.MoveTo');


// entrypoint
td.start = function(){
    
    var director = new lime.Director(document.body,480,320);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);
    
    var scene1 = new lime.Scene().setRenderer();
    
    //sky
    var layer_sky =  new lime.Layer().setAnchorPoint(0,0).setPosition(0,0);
    
    var sky_gradient = new lime.fill.LinearGradient().setDirection(0,0,1,-1)
        .addColorStop(0,'#11111F').addColorStop(0.5, '#282828');
    
    var sky = new lime.Sprite().setSize(480,320).setPosition(0,0).
        setAnchorPoint(0,0).setFill(sky_gradient);
    
    layer_sky.appendChild(sky);
       
    num_stars = goog.math.uniformRandom(100,200);
    
    for(i=0;i<num_stars;i++) {
        var star = new td.Star();
        layer_sky.appendChild(star);
    }
    
    //spaceship
    var player = new td.Player().setPosition(240,280);
    
    //move ship
    goog.events.listen(layer_sky, ['mousedown', 'touchstart'], function(e) {
        var rocket_movement = new lime.animation.MoveTo(e.position.x,player.getPosition().y).setDuration(1);
        player.runAction(rocket_movement);
    });
    
    //generate enemies
    num_enemies = goog.math.uniformRandom(10,20);
    enemies = [];
    
    for(i=0;i<num_enemies;i++) {
        var enemy = new td.Enemy();
        enemies.push(enemy);
        layer_sky.appendChild(enemy);
    }
    
    //shoot bullets
    lime.scheduleManager.scheduleWithDelay(function() {
        var bullet = new td.Bullet().setPosition(this.getPosition().x,245);
        
        //add bullet to player
        this.bullets.push(bullet);
        
        scene1.appendChild(bullet);
        
        
        
    }, player, 500);
    
    lime.scheduleManager.schedule(function(dt) {
        //update bullets positions
        for(i in this.bullets) {
            current_bullet = this.bullets[i];
            
            current_x = current_bullet.getPosition().x;
            current_y = current_bullet.getPosition().y;
            
            current_bullet.setPosition(current_x,current_y+current_bullet.speed*dt);
            
            if(current_y < 0) {
                current_bullet.setHidden(true).removeDomElement();
                delete this.bullets[i];
                this.bullets.splice(i,1);
            }
            
            //collision detection
            for(j in enemies) {
                if(goog.math.Box.intersects(this.bullets[i].getBoundingBox(),enemies[j].getBoundingBox())) {
                    enemies[j].setHidden(true).removeDomElement();
                    delete enemies[j];
                    enemies.splice(j,1);
                }
            }
        }
    }, player);
    
    
    scene1.appendChild(layer_sky);
    scene1.appendChild(player);
    
    director.replaceScene(scene1);
}
