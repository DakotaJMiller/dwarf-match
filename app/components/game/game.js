 ;(function () {
 angular.module('dwarfMatch')
   .component('gameComponent', {
     controller: GameController,
     templateUrl: 'app/components/game/game.html'
   })

 function GameController ($timeout, GameService) {
   var gc = this

   
   gc.deck = GameService.getDeck()

   var firstCard;
   var secondCard;

   gc.attempts = 0
   gc.totalMatches = 0

   gc.victory = false

   
   gc.selectCard = function(card){
     if(card.show == true || firstCard && secondCard){
       return
     }
     card.show = true
     if(!firstCard){
       firstCard = card;
     }else{
       secondCard = card
       
       var match = isMatch(firstCard, secondCard)
       if(match){
         resetCards();
       }else {
         $timeout(function(){

         firstCard.show = false
         secondCard.show = false
         resetCards()
         }, 700)
       }
     }
   }
 


   resetCards = function (card) {

     firstCard = null

     secondCard = null

     gc.attempts += 1
     }


     isMatch = function (firstCard, secondCard) {
       if( firstCard.title == secondCard.title ){
           gc.totalMatches += 1;
           checkVictory()
           return true

       }else{

           return false
       }

     }

     checkVictory = function(){
       if(gc.totalMatches == 12){
         gc.victory = true
       }

     }

     gc.resetGame = function(){
       gc.deck = GameService.getDeck();
       gc.attempts = 0;
       gc.totalMatches = 0;
       gc.victory = false

     }



 }
}())