app.controller("activityController", function($scope){
    $scope.message="This could be just a begining.";
    
    //################################## CLOCK ######################################

        // var popup=document.getElementById("popup");
        var clockPopup=document.getElementById("clk");
        
        window.addEventListener("scroll", function(){
        // var contentPosition=popup.getBoundingClientRect().top;
        var screenPosition=window.innerHeight/3;
            // if(screenPosition>contentPosition)
            // {
            //     popup.classList.add("active");
            // }else
            // {
            //     popup.classList.remove("active");
            // }

            var contentPositionOfClock=clockPopup.getBoundingClientRect().top;
            var screenPosition=window.innerHeight/0.4;
            
            if(screenPosition>contentPositionOfClock)
            {
                clockPopup.classList.add("pop");
            }else
            {
                clockPopup.classList.remove("pop");
            }

        });

        var hrHamd=document.getElementById("hr");
        var minHand=document.getElementById("min");
        var secHand=document.getElementById("sec");

        setInterval(()=>{
            var date=new Date();
            var hours = date.getHours();
            var minutes=date.getMinutes();
            var seconds=date.getSeconds();

            hrHamd.style.transform=`rotate(${(hours*30)+(minutes*0.5)}deg)`;
            minHand.style.transform=`rotate(${(minutes*6)+(seconds*0.1)}deg)`;
            secHand.style.transform=`rotate(${seconds*6}deg)`;

        }, 1000);
    //################################## CLOCK ######################################

    //################################# MATCH #######################################
    var score=0, failed=0;
    const cardsInputArray=[
        {
            cname:'circle',
            image:'./images/match/circle.png'
        },
        {
            cname:'thunder',
            image:'./images/match/thunder.png'
        },
        {
            cname:'red_heart',
            image:'./images/match/red_heart.png'
        },
        {
            cname:'vertical_rectangle',
            image:'./images/match/vertical_rectangle.png'
        },
        {
            cname:'red_heart',
            image:'./images/match/red_heart.png'
        },
        {
            cname:'circle',
            image:'./images/match/circle.png'
        },
        {
            cname:'down_arrow',
            image:'./images/match/down_arrow.png'
        },
        
        {
            cname:'four_point_star',
            image:'./images/match/four_point_star.png'
        },
        {
            cname:'four_point_star',
            image:'./images/match/four_point_star.png'
        },
        {
            cname:'vertical_rectangle',
            image:'./images/match/vertical_rectangle.png'
        },
        {
            cname:'star',
            image:'./images/match/star.png'
        },
        
        {
            cname:'hexagon',
            image:'./images/match/hexagon.png'
        },
        {
            cname:'down_arrow',
            image:'./images/match/down_arrow.png'
        },
        {
            cname:'star',
            image:'./images/match/star.png'
        },
        {
            cname:'thunder',
            image:'./images/match/thunder.png'
        },
        {
            cname:'hexagon',
            image:'./images/match/hexagon.png'
        }
    ];


    function shuffel(elements){
        for(let i=0;i<elements.length;i++){
            let swapVariable=Math.floor(i*Math.random());
            let temp=elements[i];
            elements[i]=elements[swapVariable];
            elements[swapVariable]=temp;
        }
        return elements;
    }

    var cards=[];


    var cardsFlipped=[];
    var cardsFlippedIds=[];
    
    const board=document.getElementById("board");
    function makeBoard(){
        console.log("creating board");
        cards=shuffel(cardsInputArray);
        for(let i=0;i<cards.length;i++)
        {   
            var card=document.createElement("img");
            card.setAttribute("src", "./images/match/general.png");
            card.setAttribute("id", i);
            card.setAttribute("class", "imgc");
            card.addEventListener("click", flipcard);
            board.appendChild(card);
        }
    }
    makeBoard();

    function displayScore(){
        document.getElementById("score").textContent=score;
        document.getElementById("failed").textContent=failed;
        if(score==8)
        {
            if(failed<=10)
            {
                document.getElementById("comments").textContent="Congrats ! cards matched Nice memory !";
            }
            let totalAtmps=score+failed;
            alert("Game Won !\n"+"Total Attempts : "+totalAtmps);
            setTimeout(refresh, 3000);
        }   
    }
    function refresh(){
        window.location.reload();
    }
    function checkForMatch(){
        var flag=false;
        var grid=document.getElementById("board");
        var temporaryCards=grid.querySelectorAll("img");
        var card1=cardsFlippedIds[0];
        var card2 = cardsFlippedIds[1];
        if(cardsFlipped[0]===cardsFlipped[1])
        {
            document.getElementById("comments").textContent="Congrats ! cards matched :)";
            temporaryCards[card1].setAttribute("src", "./images/match/done.png");
            temporaryCards[card2].setAttribute("src", "./images/match/done.png");
            flag=true;
            score+=1;
        }
        else{
            document.getElementById("comments").textContent="Try again :(";
            failed+=1;
        }
        if(!flag)
        {
            temporaryCards[card1].setAttribute("src", "./images/match/general.png");
            temporaryCards[card2].setAttribute("src", "./images/match/general.png");
        }
        else{
            temporaryCards[card1].removeEventListener("click", flipcard);
            temporaryCards[card2].removeEventListener("click", flipcard);
        }
        cardsFlippedIds=[];
        cardsFlipped=[];
        displayScore();
    }

    function flipcard(){
        var cardId=this.getAttribute("id");
        cardsFlipped.push(cards[cardId].cname);
        cardsFlippedIds.push(cardId);
        if(cardsFlippedIds[0]==cardsFlippedIds[1])
        {
            let cid=cardsFlippedIds[0];
            alert("Same card clicked ");
            document.getElementById(cid).setAttribute("src", "./images/match/general.png");
            cardsFlipped=[];
            cardsFlippedIds=[];
        }
        else{
            this.setAttribute("src", cards[cardId].image);
            if(cardsFlipped.length==2)
            {
                setTimeout(checkForMatch, 500);
            }
        }
    }
    

    //################################# MATCH #######################################

    //################################# BUILD #######################################
    var mat=[[110,440,330], [550,220,660], [880,770,990]];

    //shuffling code

    var lim=3;
    let origin=1;
    let size=100
    function createBoard(){
        let boardb=document.getElementById("boardb");
        for(let i=0;i<lim;i++)
        {
            for(let j=0;j<lim;j++)
            {
                var tile=document.createElement("img");
                // tile.textContent=mat[i][j]+"";
                tile.setAttribute("alt", mat[i][j]);
                tile.setAttribute("src", "./images/build/"+mat[i][j]+".png");
                tile.setAttribute("class", "tiles");
                tile.addEventListener("click", move);
                tile.setAttribute("id",""+mat[i][j]);
                let tLeft=(j*size)+origin;
                let tTop=(i*size)+origin;
                tile.style.left=tLeft+"px";
                tile.style.top=tTop+"px";
                boardb.appendChild(tile);
            }
        }
    }
    createBoard();
    var countb=0;
    var solution=[[110, 990, 880], [770, 660, 550], [440, 330, 220]];
    var tempi=0, tempj=0;
    var moves=0;
    function move(){
        countb++;
        var id=this.id;
        let matchFound=false;
        console.log("move is called"+id);
        // var element=document.getElementById(id);
        // element.style.backgroundColor="blanchedalmond";
        for(let i=0;i<lim;i++)
        {
            for(let j=0;j<lim;j++)
            {
                if(id==mat[i][j])
                {
                    var bd=0, br=0, bl=0, bt=0;
                    let flag="";
                    // console.log(mat[i][j]);
                    try{
                        bd=mat[i+1][j];
                    }catch(e)
                    {
                        flag+="d";
                        bd=-1;
                    }
                    try{
                        bt=mat[i-1][j];
                    }catch(e)
                    {
                        flag+="t";
                        bt=-1;
                    }
                    try{
                        bl=mat[i][j-1];
                        if(bl==undefined)
                        {
                            bl=-1;
                            flag+="l";
                        }
                    }catch(e)
                    {
                        flag+="l";
                        bl=-1;
                    }
                    try{
                        br=mat[i][j+1];
                        if(br==undefined)
                        {
                            br=-1;
                            flag+="r";
                        }
                    }catch(e)
                    {
                        flag+="r";
                        br=-1;
                    }
                    console.log(flag+" neighbours  top : "+bt+" bottom : "+bd+" left : "+bl+" right : "+br);
                    // let movable=false;
                    if(countb==2)
                    {
                        moves++;
                        let text="moves : "+moves;
                        document.getElementById("gmove").textContent=text;
                        countb=0;
                        if(tempi==i)
                        {
                            if(Math.abs(tempj-j)==1)
                            {
                                let tempLeft=(tempj*size)+origin;
                                let nTempLeft=(j*size)+origin;
                                console.log(tempLeft+" "+nTempLeft);
                                document.getElementById(mat[i][j]).style.left=tempLeft+"px";
                                document.getElementById(mat[tempi][tempj]).style.left=nTempLeft+"px";
                                
                                console.log("is neighbour (same row)");
                                let tem=mat[i][j];
                                mat[i][j]=mat[tempi][tempj];
                                mat[tempi][tempj]=tem;
                            }
                            else{
                                console.log("not neighbour");
                            }
                        }
                        else if(tempj==j)
                        {
                            if(Math.abs(tempi-i)==1)
                            {
                                let tempTop=(tempi*size)+origin;
                                let nTempTop=(i*size)+origin;
                                console.log(tempTop+" "+nTempTop);
                                document.getElementById(mat[i][j]).style.top=tempTop+"px";
                                document.getElementById(mat[tempi][tempj]).style.top=nTempTop+"px";
                                
                                console.log("is neighbour (same col)");
                                
                                let tem=mat[i][j];
                                mat[i][j]=mat[tempi][tempj];
                                mat[tempi][tempj]=tem;
                            }
                            else{
                                console.log("not neighbour");
                            }
                        }
                        else{
                            console.log("not neighbour");
                        }
                    }
                    else if(countb==1)
                    {
                        tempi=i;
                        tempj=j;    
                    }
                    matchFound=true;
                    break;
                }
            }
            if(matchFound)
            {
                break;
            }
        }    
        // console.log(mat); 
        let solutionFound=true;
        for(let i=0;i<lim;i++){
            for(let j=0;j<lim;j++)
            {
                if(mat[i][j]!=solution[i][j]){
                    solutionFound=false;
                    break;
                }
            }
            if(!solutionFound)
            {
                break;
            }
        } 
        if(solutionFound){
            alert("congrats !");
            let text="Congratulations! Game completed in "+moves+" moves";
            document.getElementById("gmove").textContent=text;
            setTimeout(refresh, 3000 );
            moves=0;
        }
    }
    
 
    
    //################################# BUILD #######################################

    //##################################### WHACKABOOM ##################################
    var imageArray=[
        {
            imgname: "exp1",
            imgSrc:"./images/whakaboom/exp1.png"
        },
        {
            imgname: "exp2",
            imgSrc:"./images/whakaboom/exp2.png"
        }, 
        {
            imgname: "exp3",
            imgSrc:"./images/whakaboom/exp3.png"
        },
        {
            imgname: "exp4",
            imgSrc:"./images/whakaboom/exp4.png"
        },
        {
            imgname: "exp5",
            imgSrc:"./images/whakaboom/exp5.png"
        },
        {
            imgname: "exp6",
            imgSrc:"./images/whakaboom/exp6.png"
        },
        {
            imgname: "exp7",
            imgSrc:"./images/whakaboom/exp7.png"
        },
        {
            imgname: "exp8",
            imgSrc:"./images/whakaboom/exp8.png"
        }
    ];
    
    
    var gscore=0;
    var ghits=0;
    
    //mousehover event 
    
    //appering baddies
    var gboard=document.getElementById("gboard");
    // window.onload=()=>{
    document.getElementById("startWhacking").addEventListener("click", startWhacking);
    document.getElementById("stopWhacking").addEventListener("click", stopWhacking);    
        
    // }
    function creategBoard(){
        console.log("I am called")
        for(let i=0;i<16;i++)
        {
            let gimage=document.createElement("img");
            gimage.setAttribute("id", i+1000);
            gimage.setAttribute("src", "./images/whakaboom/blank.png")
            // image.setAttribute("onclick", "bang('"+i+"')")
            gimage.addEventListener("click", bang);
            gimage.setAttribute("width", "100");
            gimage.setAttribute("height", "100");
            gboard.append(gimage);
        }
    }

    creategBoard();
    var tioutFunc="";
    function startWhacking(){
        tioutFunc=setInterval(function(){
            var randomId=Math.floor(Math.random()*16)+1000;
            let gcard=document.getElementById(randomId);
            var randomIndex=Math.floor(Math.random()*5);
    
            gcard.setAttribute("src", imageArray[randomIndex].imgSrc);
            setTimeout(function(){
                hideCard(randomId);
            }, 1000);
        }, 900);    
    }
    function stopWhacking(){
        window.location.reload();
    }


    function hideCard(id){
        document.getElementById(id).setAttribute("src", "./images/whakaboom/blank.png");
    }
    
    function bang()
    {
        let id=this.id;
        let gcard=document.getElementById(id);
        let cardImg=gcard.getAttribute("src");
        if(cardImg!="./images/whakaboom/blank.png")
        {
            ghits++;
            gscore+=15;
            document.getElementById("ghits").textContent=ghits;
            document.getElementById("sc").textContent=gscore;        
            gcard.setAttribute("src", "./images/whakaboom/bang.png")
        }
    }
    //##################################### WHACKABOOM ##################################

});

