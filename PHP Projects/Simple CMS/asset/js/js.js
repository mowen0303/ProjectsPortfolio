/**
 * * Created by Jerry on 2017-11-06.
 */

$(document).ready(function () {

    //login page setting
    var $containerLogin = $("#containerLogin");
    if ($containerLogin.length > 0) {
        //
        var $userName = $("#containerLogin [name='username']");
        var $password = $("#containerLogin [name='password']");
        var $errorBox = $("#errorBox");
        var $errorBoxCloseButton = $("#errorBox i");
        var $submitButton = $("#submitButton");

        inputMessage($userName, "username");
        inputMessage($password, "password");

        //ball
        ballController($containerLogin);


        //login
        $submitButton.click(function () {
            var isAutoLogin = $("#containerLogin [name='isAutoLogin']:checked").val() || 0;
            $.ajax({
                method: "POST",
                dataType: "json",
                url: "http://www.atyorku.ca/a2/page/user/userController.php?action=loginWithJson",
                data: {'username': $userName.val(), 'password': $password.val(), 'isAutoLogin': isAutoLogin},
            })
                .done(function (data) {
                    if (data.code == 1) {
                        window.location.href = "http://www.atyorku.ca/a2/page/frame/index.php";
                    } else {
                        $errorBox.children("span").html(data.message);
                        $errorBox.slideDown();

                        $errorBoxCloseButton.click(function () {
                            $(this).parent().slideUp();
                        });
                    }
                })
                .fail(function (error) {
                    console.log(error.responseText);
                })
        })

    }

    //Disable copy function.
    $("body").bind("copy", function () {
        return false;
    });

    //Disable paste function.
    $("body").bind("paste", function () {
        return false;
    });

    //Load base64 data into img background attribute.
    $(".protectedImg").each(function () {
        $(this).css({"background-image": "url(" + $(this).attr("data-src") + ")"});
    })

    //chatRoom
    $chatRoom = $("#chatRoom");
    if ($chatRoom.length > 0) {
        $.ajax({
            dataType: "json",
            url: "http://www.atyorku.ca/a2/page/chat/chatController.php?action=getMessagesWithJson",
        })
            .done(function (data) {
                if (data.code == 1) {
                    $.each(data.result, function (index, item) {
                        $('<div class="chat"><span>' + item.user_name + ': </span><em>' + item.chat_message + '</em></div>').appendTo($chatRoom);
                    })
                }
            })
            .fail(function (error) {
                console.log(error.responseText);
            })

        $msgBox = $("#msgBox");
        $("#chatButton").click(function () {
            var message = $("#chatInput").val();
            $.ajax({
                method: "POST",
                dataType: "json",
                url: "http://www.atyorku.ca/a2/page/chat/chatController.php?action=addMessageWithJson",
                data: {'message': message}
            })
                .done(function (data) {
                    if (data.code == 1) {
                        $('<div class="chat"><span>' + data.result.user_name + ': </span><em>' + data.result.chat_message + '</em></div>').appendTo($chatRoom).hide().slideDown(200);
                    } else {
                        $msgBox.html(data.message).slideDown(200);
                        setTimeout(function () {
                            $msgBox.slideUp()
                        }, 2000);
                    }
                })
                .fail(function () {
                    console.log(error);
                })
        })
    }




//customize input default value. Same expression with placeholder, but having a higher UE performance.
function inputMessage($element, txt) {
    var type = $element.attr("type");
    if (type == "password") {
        $element.attr("type", "text");
    }
    $element.val(txt);
    $element.focus(function () {
        if (type == "password") {
            $element.attr("type", "password");
        }
        if ($(this).val() == txt) {
            $(this).val("");
        }
    }).blur(function () {
        if ($(this).val() == "") {
            if (type == "password") {
                $element.attr("type", "text");
            }
            $(this).val(txt)
        }
    });
}

//ball class
function BallClass(radius,x,y,speedX,speedY,classID,scene){
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.obj = $('<div class="ball ball_'+classID+'" style="width:'+radius*2+'px;height:'+radius*2+'px"></div>').appendTo($containerLogin);
    this.obj.appendTo(scene);
}

BallClass.prototype.move = function(){
    this.x+=this.speedX;
    this.y+=this.speedY;
    this.obj.css({"left":this.x+"px","top":this.y+"px"});
    if(((this.speedX>0 && this.x+this.radius*2)>=window.innerWidth) || (this.speedX<0&&this.x<=0)){
        this.speedX = - this.speedX;
    }

    if(((this.speedY>0 && this.y+this.radius*2)>=window.innerHeight) || (this.speedY<0 &&this.y<=0)){
        this.speedY = - this.speedY;
    }
}



function ballController(scene){

    var ballArr = [
        new BallClass(getRandom(70,130),getRandom(0,window.innerWidth),getRandom(300,innerHeight),-0.8,1,1,scene),
        new BallClass(getRandom(70,130),getRandom(0,window.innerWidth),getRandom(300,innerHeight),-0.5,0.7,2,scene),
        new BallClass(getRandom(70,130),getRandom(0,window.innerWidth),getRandom(300,innerHeight),0.7,1,1,scene),
        new BallClass(getRandom(70,130),getRandom(0,window.innerWidth),getRandom(500,innerHeight),-0.8,-0.9,2,scene),
        new BallClass(getRandom(70,130),getRandom(0,window.innerWidth),getRandom(500,innerHeight),0.6,1,1,scene),
        new BallClass(getRandom(70,150),getRandom(0,window.innerWidth),getRandom(500,innerHeight),1.2,1.2,scene),
        new BallClass(getRandom(70,200),getRandom(0,window.innerWidth),getRandom(500,innerHeight),0.9,-0.9,1,scene),
        new BallClass(getRandom(70,200),getRandom(0,window.innerWidth),getRandom(700,innerHeight),1,-0.6,2,scene),
        new BallClass(getRandom(70,200),getRandom(0,window.innerWidth),getRandom(700,innerHeight),-1.2,-0.6,1,scene),
        new BallClass(getRandom(70,200),getRandom(0,window.innerWidth),getRandom(700,innerHeight),-1,0.9,2,scene),

    ]

    setInterval(function(){
        for(var i = 0; i<ballArr.length; i++){
            ballArr[i].move();
        }
    },30)
}

    function getRandom(min,max){
        return Math.floor(Math.random()*(max+1-min)+min)
    }



})
