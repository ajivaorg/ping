 if(barName === thisBar1){
        ball.style.top=bar2.getBoundingClientRect().y-bar2.getBoundingClientRect().height+"px";
        moveY=-2;
    }

    else if(barName === thisBar2){
        ball.style.top=bar1.getBoundingClientRect().height+"px";
        moveY=2;       
    }

    score=0;
    gameStart=false;

}




document.addEventListener('keydown',function(event){

    if(event.keyCode==68 || event.keyCode==39){
        if(parseInt(bar1.style.left)<(window.innerWidth-bar1.offsetWidth-border)){
            bar1.style.left=parseInt(bar1.style.left)+movement+'px';
            bar2.style.left=bar1.style.left;
        };

    };

    if(event.keyCode==65 || event.keyCode==37){
        
        if(parseInt(bar1.style.left)>border){
            bar1.style.left=parseInt(bar1.style.left)-movement+'px';
            bar2.style.left=bar1.style.left;
        };

    };

    if(event.keyCode==13){
        
        if(!gameStart){
            gameStart=true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY=ballRect.y;
            let ballDia=ballRect.width;

            let bar1Height=bar1.offsetHeight;
            let bar2Height=bar2.offsetHeight;
            let bar1Width=bar2.offsetWidth;
            let bar2Width=bar2.offsetWidth;

            ballMoving = setInterval(function(){
            
                let bar1X=bar1.getBoundingClientRect().x;
                let bar2X=bar2.getBoundingClientRect().x;

                let ballCentre=ballX+ballDia/2;

                ballX+=moveX;
                ballY+=moveY;

                ball.style.left=ballX+"px";
                ball.style.top=ballY+"px";

                if(((ballX+ballDia)>window.innerWidth) || (ballX<0)){
                    moveX=-moveX;
                }

                if(ballY<=bar1Height){
                    moveY=-moveY;
                    score++;

                    if((ballCentre<bar1X) || (ballCentre>(bar1X+bar1Width))){
                        dataStoring(score,thisBar2);
                    }
                }
                if((ballY+ballDia)>=(window.innerHeight-bar2Height)){
                    moveY=-moveY;
                    score++;

                    if((ballCentre<bar2X) || (ballCentre>(bar2X+bar2Width))){
                        dataStoring(score,thisBar1);
                    }
                }  
            }, 10);
        }
    }
});

function dataStoring(scoreObtained,winningBar){
    if(score>highScore){
        highScore=score;
        localStorage.setItem(storeName,winningBar);
        localStorage.setItem(storeScore,highScore);
    }
    clearInterval(ballMoving);
    gameReset(winningBar);

    alert(winningBar+" wins with score of "+(scoreObtained*100)+". Max Score is: "+(highScore*100));
}
