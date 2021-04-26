var flag=false;
$("#burger").click(function(){
    console.log("clicked ")
    if(flag){
        //hide
        hide();
        flag=false;
    }else{
        //display
        display();
        flag=true;
    }

});

function display(){
    $('#links').css("left", "0%");
    console.log("display is called");
}
function hide(){
    $('#links').css("left", "-100%");
    console.log("hide is called");
}