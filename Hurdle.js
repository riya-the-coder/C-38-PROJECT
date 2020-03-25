class Hurdle {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      Hurdle1 = createSprite(100,200);
     // Hurdle1.addImage
      Hurdle2 = createSprite(300,200);
      //Hurdle2.addImage
      Hurdle3 = createSprite(500,200);
      //Hurdle3.addImage
      Hurdle4 = createSprite(700,200);
      //Hurdle4.addImage
      Hurdles = [Hurdle1, Hurdle2, Hurdle3, Hurdle4];
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track, 0,displayHeight,-displayWidth*4, displayHeight*5);
        
        
        var index = 0;
  
      
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
         
          index = index + 1 ;
  
         
          x = x + 200;
         
          y = displayHeight - allPlayers[plr].distance;
          Hurdles[index-1].x = x;
          Hurdles[index-1].y = y;
  
        
           
         
        }
  
      }
  
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
        text("GAME OVER",200,200);
      }
     
      drawSprites();
    }
}