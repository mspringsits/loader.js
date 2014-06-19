var Loader = {

    /*
    options so far:
        *)no-display:
            displays no content on the page
        *)black-background
            the whole appears as a black box
        *)alpha
            sets the alpha value of the page to the input value
     */
    preload: function(action, parameter) {
        if((typeof action) == 'function')
            action();
        if((typeof action) == 'string') {
            preloader = action;
            switch(action) {
                case 'no-display':
                    $('body > :not(#drawing_canvas)').hide();
                    break;
                case 'black-background':
                    $("<div>").attr('id', 'blackbox_position').css({
                        width: $(document).width() + 'px',
                        height: $(document).height() + 'px',
                        backgroundColor: "black",
                        position: "absolute",
                        top: "0px",
                        left: "0px"
                    }).appendTo($("body"));
                    break;
                case 'custom-background':
                    if(typeof(parameter)=='string') {
                        $("<div>").attr('id', 'colorbox_position').css({
                            width: $(document).width() + 'px',
                            height: $(document).height() + 'px',
                            backgroundColor: parameter,
                            position: "absolute",
                            top: "0px",
                            left: "0px"
                        }).appendTo($("body"));
                    }
                    break;
                case 'alpha':
                    if((typeof parameter) == 'number')
                        $("body").css("opacity", parameter);
                    else
                        $("body").css("opacity", 0.5);
                default:
                    break;
            }
        }
    },

    main: function(action, parameter) {
        if((typeof action) == 'function')
            action();
        if((typeof action) == 'string') {
            switch(action) {
                case "standard":
                    animation = "standard";
                    var ratio = $(window).width()*0.04;
                    var canvas = $("<canvas>").attr("width", ratio*2+15).attr("height", ratio*2+15).attr("id", "drawing_canvas");
                    canvas.css("top", ($(window).height()/2)-ratio+"px").css("left",($(window).width()/2)-ratio+"px").css("position", "absolute");
                    canvas.appendTo($("body"));

                    var ctx = document.getElementById("drawing_canvas").getContext("2d");
                    var cx = ratio+5;
                    var cy = ratio+5;
                    var angle = 3 * Math.PI / 180;

                    animate = function() {
                        requestAnimationFrame(animate);
                        ctx.clearRect(0, 0, ratio*2+15, ratio*2+15);
                        drawCircle();
                        drawPoint();
                    }
                    animate();

                    function drawCircle() {
                        ctx.beginPath();
                        ctx.strokeStyle = "black";
                        ctx.arc(cx,cy,ratio,0,2*Math.PI);
                        ctx.stroke();
                    }

                    function drawPoint() {
                        angle += 4 * Math.PI / 180;
                        var newX = cx + ratio * Math.cos(angle);
                        var newY = cy + ratio * Math.sin(angle);
                        ctx.fillStyle = "skyblue";
                        ctx.strokeStyle = "lightgray";
                        ctx.beginPath();
                        ctx.arc(newX, newY, 5, 0, 2*Math.PI);
                        ctx.fill();
                        ctx.stroke();
                    }
                    break;

                case "custom":
                    animation = "custom";
                    if(typeof(parameter)=='string') {
                        $("<div>").attr("id", "custom_div").css("position", "absolute").css("top", "0px").css("left", "0px").html(parameter).appendTo($("body"));
                    }
                    break;

                case "text":
                    animation = "standard";
                    if(typeof(parameter)=='string') {
                        var cwidth = $(window).width();
                        var cheight = $(window).height()
                        var canvas = $("<canvas>").attr("width", cwidth).attr("height", cheight).attr("id", "drawing_canvas");
                        canvas.css("top", "0px").css("left","0px").css("position", "absolute");
                        canvas.appendTo($("body"));
                        var ctx = document.getElementById("drawing_canvas").getContext("2d");
                        var count = 0;
                        setInterval(function() {
                            var dots = ["", ".", "..", "..."];
                            ctx.clearRect(0, 0, cwidth, cheight);
                            ctx.font = "30px Arial";
                            ctx.fillText(parameter+dots[count%4],50,50);
                            count++;
                        }, 500);
                    }
                    break;
                default:
                    break;
            }
        }
    },

    finish: function(action, parameter) {
        $(window).load(function() {
            if((typeof action) == 'function')
                action();
            if(typeof(animation)!='undefined') {
                if(animation=="standard")
                    $("#drawing_canvas").remove();
                else if(animation=="custom")
                    $("#custom_div").remove();
            }
            switch(preloader) {
                case "no-display":
                    if((typeof action) == 'string') {
                        if(action=="fade") {
                            if(typeof(parameter)=='number') {
                                $('body > :not(#drawing_canvas)').fadeToggle(parameter);
                            }
                            else {
                                $('body > :not(#drawing_canvas)').fadeToggle(1000);
                            }
                        }
                        else
                            $('body > :not(#drawing_canvas)').show();
                    }
                    else
                        $('body > :not(#drawing_canvas)').show();
                case "black-background":
                    if((typeof action) == 'string') {
                        if(action=="fade") {
                            if(typeof(parameter)=='number')
                                $("#blackbox_position").animate({opacity: 0}, parameter, function() { $("#blackbox_position").remove() });
                            else
                                $("#blackbox_position").animate({opacity: 0}, 1500, function() { $("#blackbox_position").remove(); });
                        }
                    }
                    else
                        $("#blackbox_position").remove();
                case "custom-background":
                    if((typeof action) == 'string') {
                        if(action=="fade") {
                            if(typeof(parameter)=='number')
                                $("#colorbox_position").animate({opacity: 0}, parameter, function() { $("#colorbox_position").remove() });
                            else
                                $("#colorbox_position").animate({opacity: 0}, 1500, function() { $("#colorbox_position").remove(); });
                        }
                    }
                    else
                        $("#colorbox_position").remove();
                case "alpha":
                    if((typeof action) == 'string') {
                        if(action=="fade") {
                            if(typeof(parameter)=='number')
                                $("body").animate({opacity: 1}, parameter);
                            else
                                $("body").animate({opacity: 1}, 3000);
                        }
                    }
                    else
                        $("body").css("opacity", 1);
                default:
                    break;
            }
        });
    }
}