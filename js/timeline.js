
//width could be any value such as milliseconds
var timelineLength = 5000;
var ZoomValue = .4;
var mainTL = new TimelineLite({onUpdate:updateSlider});
var playBtn = $("#playBtn"),
pauseBtn = $("#pauseBtn"),
resumeBtn = $("#resumeBtn"),
time = $("#time"),
progress = $("#progress"),
timeScale = $("#timeScale"),
scrubber = $(".scrubber-icon"),
buttons = [playBtn, pauseBtn, resumeBtn],
progressSlider;
var timelineItems = 0;
var elementTL = [];
elementTL[timelineItems] = new TimelineLite();
var insertTime = 0;
var scrubberValue= 0;
var formAnimation = {};
var targetthing = '$("#exampleAnimation")';

var greenSockUI = {
  "spin": {"duration": "2", "rotation": "+=360", "ease": "Elastic.easeOut"},
  "teardropBL":  {"duration": "2","borderRadius":"50px 50px 50px 0px"},
  "teardropBR":  {"duration": "2","borderRadius":"50px 50px 0px 50px"},
  "teardropTR":  {"duration": "2","borderRadius":"50px 0px 50px 50px"},
  "teardropTL":  {"duration": "2","borderRadius":"0px 50px 50px 50px"},
  "spherize":  {"duration": "2","borderRadius":"50%"},
  "spherize2":  [{"duration": ".6", "scaleX":"1.5", "scaleY":"0.8", "borderRadius":"20% 20% 20% 20%"}, {"duration": ".6", "scaleX":"0.7", "borderRadius":"30% 30% 30% 30%"}, {"duration": "2.6", "scaleX":"1", "borderRadius":"0px 0px 0px 0px"} ],
  "test":{"duration": ".3", "scaleX":".95", "scaleY":"1.05", "yoyo":"true", "transformOrigin":"50% 95%", "repeat":"5", "ease":"Sine.easeInOut"}, 
  "rotationX": {"duration": "2", "rotationX": "+=360", "ease": "Power2.easeOut"}, 
  "rotationY": {"duration": "2", "rotationY": "+=360", "ease": "Power1.easeInOut"}, 
  "flipInY": [{"duration":"0.2", "transformPerspective": "400", "rotationY": "90", "opacity": "0", "startAt": {"transformPerspective": "400", "opacity": "0", "rotationY": "0"} }, {"duration":"0.2", "transformPerspective": "400", "rotationY": "-20", "startAt": {"transformPerspective": "400", "opacity": "0", "rotationY": "90"} }, {"duration":"0.2", "transformPerspective": "400", "rotationY": "10", "opacity": "1", "startAt": {"transformPerspective": "400", "rotationY": "-20"} }, {"duration":"0.2", "transformPerspective": "400", "rotationY": "-5", "opacity": "1", "startAt": {"transformPerspective": "400", "opacity": "1", "rotationY": "10"} }, {"duration":"0.2", "transformPerspective": "400", "opacity": "1", "rotationY": "0", "startAt": {"transformPerspective": "400", "opacity": "1", "rotationY": "-5"} } ], 
  "flipInX": [{"duration":"0.2", "transformPerspective": "400", "rotationX": "90", "opacity": "0", "startAt": {"transformPerspective": "400", "opacity": "0", "rotationX": "0"} }, {"duration":"0.2", "transformPerspective": "400", "rotationX": "-20", "startAt": {"transformPerspective": "400", "opacity": "0", "rotationX": "90"} }, {"duration":"0.2", "transformPerspective": "400", "rotationX": "10", "opacity": "1", "startAt": {"transformPerspective": "400", "rotationX": "-20"} }, {"duration":"0.2", "transformPerspective": "400", "rotationX": "-5", "opacity": "1", "startAt": {"transformPerspective": "400", "opacity": "1", "rotationX": "10"} }, {"duration":"0.2", "transformPerspective": "400", "opacity": "1", "rotationX": "0", "startAt": {"transformPerspective": "400", "opacity": "1", "rotationX": "-5"} } ] };

function drawRulers() {
$(".timelineTicks").html("");
$(".timelineNumbers").html("");
    for (i = 0; i < timelineLength; i += (10 * 1)) {
        var spacing = (i*Number(ZoomValue)+8);
        var tickMarks = "<span class=\"minorTick\" style=\"position:absolute;width:2px;height:10px;left:"+ spacing +"px;\">|</span>";
        $(".timelineTicks").append(tickMarks);
    }
    // Numbers and red lines
    for (i = 0; i < timelineLength;  i += (100 * 1)) {
        var spacing = (i*Number(ZoomValue)+6);
        var numbers = "<span  style=\"position:absolute;width:2px;height:15px;font-size:9px;top:-10px;left:"+ spacing +"px;\">"+ i +"</span>";
        $(".timelineNumbers").append(numbers);
        var majorLines = "<span class=\"majorTick\" style=\"position:absolute;width:3px;height:20px;color:#f00;font-size:20px;top:-6px;left:"+ spacing +"px;\"><b>|</B></span>";
        $(".timelineTicks").append(majorLines);
        $(".timeline-container-header").css("width", i*ZoomValue+150);
    }
}
drawRulers();
$(".timeline-container").on("wheel", mouseZoom);
$(".timeline-container").on("click", scrubToTime);


function mouseZoom(e) {
    var dir = e.originalEvent.deltaY;
    if (dir < 0){
    ZoomValue = (ZoomValue += 0.3);           
    } else {
    ZoomValue = (ZoomValue -= 0.3);
    }
    drawRulers();

    scrubber.css("left", mainTL.time().toFixed(2)*1000*ZoomValue +"px");
    e.originalEvent.returnValue = false;
};
function scrubToTime(e) {
    scrubber = $(".scrubber-icon");
    var clickedTime = e.originalEvent.layerX/ZoomValue-8;
    scrubber.css({"left": e.originalEvent.layerX-8});
    console.log(mainTL.time());
    scrubberValue = ($(".scrubber-icon").position().left-15)/ZoomValue;
    insertTime = scrubberValue*ZoomValue+10;
    e.originalEvent.returnValue = false;
};



$(".scrubber-icon").draggable({ 
    axis: 'x',
    containment: "parent",
    drag: function( event, ui ) {
        scrubberValue = ($(".scrubber-icon").position().left-15)/ZoomValue;
        progress.html(scrubberValue/1000);
         mainTL.time(scrubberValue/1000).pause();
         insertTime = scrubberValue*ZoomValue+10;

    }

});

function updateSlider() {
    if (!isEmpty(mainTL)) {
        scrubber.css("left", mainTL.time().toFixed(2)*1000*ZoomValue +"px");
        progress.html(mainTL.time().toFixed(2));
        //console.log("HERE");
    }
}
  
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
// controls


//smooth play pause by tweening the timeScale()

$("#playPause").click(function(){
    console.log(this);
  if(this.innerHTML === "Play"){
    this.innerHTML = "Pause"
    //TweenLite.to(mainTL, 2, {timeScale:1})
    mainTL.play();
  } else {
    this.innerHTML = "Play"
    //TweenLite.to(mainTL, 2, {timeScale:0})
    mainTL.pause();
  }
})

$("#reverseBtn").on("click", function(){
  mainTL.reverse();
});

$("#restartBtn").on("click", function(){
  mainTL.restart();
});

$('#timeScaleSlider').on("slide", function(slideEvt) {
    mainTL.timeScale(slideEvt.value );
    timeScale.html(slideEvt.value)
});
// end controls


$("#AddAnimation").on("click", function(){
    greenAni(targetthing,  greenSockUI.rotationY);

    $(".timelineLayers").append("\
        <div class='col-md-2 m-0'>layer "+timelineItems+"</div>\
        <div class='col-md-10 p-0 m-0'>\
            <div id ='draggbleElement-"+timelineItems+"' class='timelineElement resizableX draggableX ui-state-active' style='width: "+ elementTL[timelineItems-1].duration()*1000*ZoomValue +"px;'>\
                greenSockUI.rotationX\
            </div>\
        </div>\
    ");
    $("#draggbleElement-"+timelineItems).css({"position":"absolute", "left": insertTime});
reInit();
});
$("#AddAnimation2").on("click", function(){
    greenAni(targetthing,  greenSockUI.rotationX);

    $(".timelineLayers").append("\
        <div class='col-md-2 m-0'>layer "+timelineItems+"</div>\
        <div class='col-md-10 p-0 m-0'>\
            <div id ='draggbleElement-"+timelineItems+"' class='timelineElement resizableX draggableX ui-state-active' style='width: "+ elementTL[timelineItems-1].duration()*1000*ZoomValue +"px;'>\
                greenSockUI.rotationX\
            </div>\
        </div>\
    ");
    
    $("#draggbleElement-"+timelineItems).css({"position":"absolute", "left": insertTime});
reInit();
});
$("#AddManual").on("click", function(){
    var formAnimationX = $("#formAnimationX").val();
    var formAnimationY = $("#formAnimationY").val();
    var formAnimationDuration = $("#formAnimationDuration").val();
    greenAni(targetthing,  {"duration": formAnimationDuration, "x": formAnimationX, "y": formAnimationY, "ease": "Elastic.easeOut"});

    $(".timelineLayers").append("\
        <div class='col-md-2 m-0'>layer "+timelineItems+"</div>\
        <div class='col-md-10 p-0 m-0'>\
            <div id ='draggbleElement-"+timelineItems+"' class='timelineElement resizableX draggableX ui-state-active' style='width: "+ elementTL[timelineItems-1].duration()*1000*ZoomValue +"px;'>\
                greenSockUI.rotationX\
            </div>\
        </div>\
    ");    

    $("#draggbleElement-"+timelineItems).css({"position":"absolute", "left": insertTime});
    reInit();
    console.log(formAnimationX, formAnimationY);
});
function reInit() {
    mainTL.clear();
    mainTL = new TimelineLite({onUpdate:updateSlider, paused: true});
    for(i=0; i<elementTL.length; i++){
        var startTime = ($("#draggbleElement-"+ (i+1)).position().left)/ZoomValue+12;
        mainTL.add(elementTL[i], startTime/1000);
    }
    
    $( ".draggableX" ).draggable({ axis: "x", containment: "parent" });
    $( ".resizableX" ).resizable({ handles:"e,w", containment: "parent"});
}



function greenAni(targetItem, sequence) {
    var assembledTimeline = ""
    var greenAniArray = {options:{}};
      if ($.isArray(sequence))
      {         
          for (S = 0; S < sequence.length; S++) {
             for (var setting in sequence[S]) {
                if (setting == "duration")
                {
                    greenAniArray["duration"] = sequence[S][setting];
                }else{
                    greenAniArray["options"][setting] = sequence[S][setting];
                }
              }
                animationSequence = greenAniArray["options"];
                animationDuration = greenAniArray["duration"];
                assembledTimeline += '.to(' + targetItem + ', ' + animationDuration + ', ' + JSON.stringify(animationSequence) + ')';
          }
      }
      else
      {
        for (var setting in sequence) {
            if (setting == "duration") {greenAniArray["duration"] = sequence[setting];}
            else {greenAniArray["options"][setting] = sequence[setting];}
        }
        animationSequence = greenAniArray["options"];
        animationDuration = greenAniArray["duration"];
        assembledTimeline += '.to($(' + targetItem + '), ' + animationDuration + ', ' + JSON.stringify(animationSequence) + ')';
      }
                  
    elementTL[timelineItems] = new TimelineLite();
    var TLcurrent = elementTL[timelineItems];
    var TL = "TLcurrent" + assembledTimeline;
    eval(TL);
    timelineItems++;
};

$("#timelineZoom").slider({
      range: "max",
      min: 0.4,
      max: 5,
      step: 0.05,
      value: 2,
      slide: function( event, ui ) {
        ZoomValue = ui.value;
        drawRulers();
        scrubber.css("left", mainTL.time().toFixed(2)*1000*ZoomValue +"px");
        $(".timelineElement").css("width", mainTL.time().toFixed(2)*1000*ZoomValue +"px");
      }
    });



$(".rightClickMenu").hide();
$('.rightClickMenu').mousedown(function(event){event.stopPropagation();}); 
$(".exampleAnimation").mousedown(function(e) {
    targetDiv = e.target;
    actionItem = $(e.target).attr("data-animationId");
    switch (e.which) {
       case 1: //left button
            $( ".rightClickMenu" ).hide();
       break;
        case 3: //right button

        clickItem=e.target;
        // get current mouse position to know where to place the menu
        var currentMousePos={"x":"","y":""};
        currentMousePos.x = e.pageX;
        currentMousePos.y = e.pageY;

        //add the actual menu to the body, assign it to the data-menu from before
        $('.rightClickMenu').css({
            "position":"absolute",
            "z-index":"10000",
            "border": "6px solid transparent",
            "padding-top":"4px",
            "top":currentMousePos.y,
            "left":currentMousePos.x
            });

        


             if ($(e.target).hasClass("exampleAnimation") || $(e.target).hasClass("slider-container"))
             {
                 $( ".rightClickMenu" ).show();
                 window.oncontextmenu = function() { return false };
             }else{
                $( ".rightClickMenu" ).hide();
                window.oncontextmenu = function() { return true };
             };
        break;
    }
}); // close menu if you click on something other than menu


/*
Change the Pseudo Elements on an object
example: updatePseudo( this, "after", { height: '20px'} );
*/
var updatePseudo = function(){
    
    var pseudos = {},
        count = 1,
        style = document.createElement('style');
    document.body.appendChild( style );
    return function( node, type, keyValues ){
        var id = node.getAttribute('data-has-pseudo');
        if( !id ){
            id = count++;
            node.setAttribute('data-has-pseudo', count);
        }
        id = `[data-has-pseudo="${count}"]:${type}`;
        pseudos[id] = pseudos[id] || {content:''};
        if( typeof keyValues === 'object' ){
            for( let key in keyValues ){
                pseudos[id][key] = keyValues[key];
            }
            style.textContent = '';
            for( let key in pseudos ){
                style.textContent += `${key}{`
                for( attr in pseudos[key] ){
                    style.textContent += `${attr}:${pseudos[key][attr]};`
                }
                style.textContent += `};`;
            }
            return node;
        } else if( typeof keyValues === 'string' ){
            return pseudos[id][keyValues];
        }
    }
}();

