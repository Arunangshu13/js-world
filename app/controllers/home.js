app.controller("homeController", function($scope){

    var data=["experiencing java script implementation.", "building awesome mini application in js.", "finding cool css effects for your website.", "a lot other stuff!"];
    var type=document.getElementById("type");
    var currentText="";
    var letters="";
    var count=0;
    var index=0;
    (function typeController(){
        var intervalId=setInterval(function typeContent(){
            currentText=data[count];

            letters=currentText.slice(0, ++index);
            type.textContent=letters;
            if(letters.length==currentText.length)
            {
                index=0;
                clearInterval(intervalId);
                count+=1;
                if(count==data.length)
                {
                    count=0;
                }
                setTimeout(typeController, 2000);
            }
            
        }, 100);
    }());

});