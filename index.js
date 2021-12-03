
function ready(){
    let overlays = Array.from(document.getElementsByClassName('overlay_text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    overlays.forEach(overlay=>{
        overlay.addEventListener('click',()=>{
            overlay.classList.remove('visible');
            game.startGame();
        })
    })
    cards.forEach(card=>{
        card.addEventListener('click',()=>{
            game.flipCard(card);
        })
    })
    let game = new MixOrMatch(100,cards);
}

class MixOrMatch{
    constructor(totalTime,cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time_remaining');
        this.ticker = document.getElementById('flips');
    }

    startGame(){
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = false;
        this.shuffleCards();
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.inne = this.totalClicks;
        this.countDown = this.startCountDown();
    }
    hideCards(){
        this.cardsArray.forEach(card=>{
            card.classList.remove('visible');
            card.classList.remove('matched');
        })
    }
    startCountDown(){
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0){
                this.gameOver();
            }
        }, 1000);
    }
    gameOver(){
        clearInterval(this.countDown);
        document.getElementById('game_over_text').classList.add('visible');
    }
    victory(){
        clearInterval(this.countDown);
        document.getElementById('victory_text').classList.add('visible');
    }
    flipCard(card){
        if (this.canFlipCard(card)){
            card.classList.add('visible');
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            if (this.cardToCheck){
                this.checkForCardMatch(card);
            }else{
                this.cardToCheck = card;
            }
        }
    }
    checkForCardMatch(card){
        if (this.getCardType(card) === this.getCardType(this.cardToCheck)){
            this.cardMatch(card,this.cardToCheck);
        }else{
            this.missMatch(card,this.cardToCheck);
        }
        this.cardToCheck = null;
    }
    cardMatch(card1,card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if (this.matchedCards.length === this.cardsArray.length){
            this.victory();
        }
    }
    missMatch(card1,card2){
        this.busy = true;
        setTimeout(()=>{
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        },1000);
    }
    getCardType(card){
        return card.getElementsByClassName('card_value')[0].src;
    }
    shuffleCards(){
        for (let i = this.cardsArray.length - 1; i > 0; i--){
            let randomIndex = Math.floor(Math.random()*(i - 1));
            this.cardsArray[randomIndex].style.order = i;
            this.cardsArray[i].style.order = randomIndex;
        }
    }
    canFlipCard(card){
       return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck)
    }
}

















if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded',ready());
}else{
    ready();
}