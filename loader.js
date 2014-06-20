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
        start_loading = new Date().getTime();
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
                        $('body > :not(#drawing_canvas)').css("opacity", parameter);
                    else
                        $('body > :not(#drawing_canvas)').css("opacity", 0.5);
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
                    var ratio = $(window).width()*0.1;
                    var canvas = $("<canvas>").attr("width", ratio*2+15).attr("height", ratio*2+15).attr("id", "drawing_canvas");
                    canvas.css("top", ($(window).height()/2)-ratio+"px").css("left",($(window).width()/2)-ratio+"px").css("position", "absolute");
                    canvas.appendTo($("body"));

                    var ctx = document.getElementById("drawing_canvas").getContext("2d");
                    ctx.globalAlpha = 0.05;

                    var startpoint = 0;
                    animate = function() {
                        requestAnimationFrame(animate);
                        ctx.clearRect(0, 0, ratio+5, ratio+5);
                        for(var i=0; i<2; i=i+0.1) {
                            ctx.beginPath();
                            ctx.arc(ratio/2+2,ratio/2+2, ratio/2, startpoint+i,startpoint+2*Math.PI/3);
                            ctx.stroke();
                        }
                        startpoint = startpoint + 0.1;
                    }
                    animate();
                    break;

                case "custom":
                    animation = "custom";
                    if(typeof(parameter)=='string') {
                        $("<div>").attr("id", "custom_div").css("position", "absolute").css("top", "0px").css("left", "0px").html(parameter).appendTo($("body"));
                    }
                    break;

                case "dots":
                    animation="standard";
                    var ratio = $(window).width()*0.10;
                    var dot = ratio/5.5;
                    var canvas = $("<canvas>").attr("width", ratio+5).attr("height", ratio).attr("id", "drawing_canvas");
                    canvas.css("top", ($(window).height()/2)-ratio/2+"px").css("left",($(window).width()/2)-ratio/2+"px").css("position", "absolute");
                    canvas.appendTo($("body"));

                    var ctx = document.getElementById("drawing_canvas").getContext("2d");

                    ctx.strokeStyle = "black";
                    var count = 0;
                    setInterval(function() {
                        ctx.clearRect(0, 0, ratio, ratio);
                        for(var i=0; i<4; i++) {
                            ctx.fillStyle = ((count%4==i)?"#009999":"lightgray");
                            console.log(ctx.fillStyle);
                            ctx.beginPath();
                            ctx.arc(dot/2+2+(i*dot*1.5),ratio/2,dot/2,0,2*Math.PI);
                            ctx.fill();
                            ctx.stroke();
                        }
                        count++;
                    },300);
                    break;

                case "spectrum":
                    animation="standard";
                    var ratio = $(window).width()*0.10;
                    var canvas = $("<canvas>").attr("width", ratio+5).attr("height", ratio+5).attr("id", "drawing_canvas");
                    canvas.css("top", ($(window).height()/2)-ratio/2+"px").css("left",($(window).width()/2)-ratio/2+"px").css("position", "absolute");
                    canvas.appendTo($("body"));
                    var ctx = document.getElementById("drawing_canvas").getContext("2d");

                    ctx.strokeStyle = "black";
                    ctx.fillStyle = "#009999";
                    var cwidth = ratio/2;
                    var change = -1;
                    animate = function() {
                        requestAnimationFrame(animate);
                        ctx.clearRect(0, 0, ratio+5, ratio+5);
                        change = ((cwidth<10)||(cwidth>ratio/2))?change*-1:change;
                        ctx.beginPath();
                        ctx.arc(ratio/2+2,ratio/2+2, cwidth,0,2*Math.PI);
                        ctx.fill();
                        ctx.stroke();
                        cwidth = cwidth + change;
                    }
                    animate();
                    break;

                case "futuristic":
                    animation="standard";
                    var ratio = $(window).width()*0.10;
                    var canvas = $("<canvas>").attr("width", ratio+5).attr("height", ratio+5).attr("id", "drawing_canvas");
                    canvas.css("top", ($(window).height()/2)-ratio/2+"px").css("left",($(window).width()/2)-ratio/2+"px").css("position", "absolute");
                    canvas.appendTo($("body"));
                    var ctx = document.getElementById("drawing_canvas").getContext("2d");

                    ctx.strokeStyle = "black";
                    ctx.lineWidth = 4;
                    var startpoint1 = 0;
                    var startpoint2 = 0;
                    var startpoint3 = 0;
                    animate = function() {
                        requestAnimationFrame(animate);
                        ctx.clearRect(0, 0, ratio+5, ratio+5);
                        ctx.beginPath();
                        ctx.arc(ratio/2+2,ratio/2+2, ratio/2, startpoint1,startpoint1+2*Math.PI/3);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(ratio/2+2,ratio/2+2, ratio*2/6, startpoint2,startpoint2+2*Math.PI/3);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.arc(ratio/2+2,ratio/2+2, ratio*1/6, startpoint3,startpoint3+2*Math.PI/3);
                        ctx.stroke();
                        startpoint1 = startpoint1 + 0.1;
                        startpoint2 = startpoint2 - 0.1;
                        startpoint3 = startpoint3 + 0.1;
                    }
                    animate();
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
                    Loader.main("text", "loading your awesome content");
                    break;
            }
        }
    },

    finish: function(action, parameter) {
        $(window).load(function() {
            if((typeof action) == 'function')
                action();
            if(typeof(animation)!='undefined') {
                if(animation=="standard") {
                    if((new Date().getTime()-start_loading)>500) {
                        $("#drawing_canvas").fadeToggle(1000, function() {
                            $("#drawing_canvas").remove();
                        });
                    }
                    else
                        $("#drawing_canvas").remove();
                }
                else if(animation=="custom") {
                    if((new Date().getTime()-start_loading)>500) {
                        $("#custom_div").fadeToggle(1000, function() {
                            $("#custom_div").remove();
                        });
                    }
                    else
                        $("#custom_div").remove();
                }
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
                                $('body > :not(#drawing_canvas)').animate({opacity: 1}, parameter);
                            else
                                $('body > :not(#drawing_canvas)').animate({opacity: 1}, 3000);
                        }
                    }
                    else
                        $('body > :not(#drawing_canvas)').css("opacity", 1);
                default:
                    break;
            }
        });
    }
}