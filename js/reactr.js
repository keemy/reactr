var listOfTests=["sound","visual","visual222"];
var userName=prompt("whats ur name");

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

setCookie("userName",userName,30);


$( document ).ready(function() {
	function submitResult(result,type){
		$.ajax("backendtest.py?readonly=false&type="+type+"&result="+result.toString()).done(function(data){
			$("#counter").text(data);
		});
	}
	function getResults(){
		$.ajax("backendtest.py?readonly=true").done(function(data){
			$("#counter").text(data);
		});
	}
	function runTest(type){
		for(var i=0 ; i<listOfTests.length; i++){
			$("#"+listOfTests[i]).css("display","none");
		}
		$("#"+type).css("display","inline-block");
		
	}
	


	for(var i=0 ; i<listOfTests.length; i++){
		$("#container").append("<div class='test' id='"+listOfTests[i]+"' style='display: none;'>test "+listOfTests[i]+" </div");
		$("#Tests").append("<option>"+listOfTests[i]+"</option>");
	}
	
	$(".test").append('<div class="testtime start"></div>');
	$(".testtime").append("<p class='startText'>click to start</p>");
	$(".testtime").append("<p class='waitText' style='display: none;'>wait for the Cue</p>");
	$(".testtime").append("<p class='scoldText' style='display: none;'>Too Soon</p>");
	$(".testtime").append("<p class='timeText' style='display: none;'>GO!!</p>");
	$(".testtime").append("<p class='resultText' style='display: none;'></p>");
	//$(".testtime").click(testsCode[$(".testtime").parents("div").attr("id")]);
	//TODO make actual tests code below used 2 submit times manually

	
	var switch_random=function(){
		timer1 = setTimeout(function() { behavior["wait2"](); }, 1500+Math.random()*3000);
	};
	var cancel_switch=function(){
		clearTimeout(timer1);
	}
	var clear_classes=function(obj){
		var classes=obj.attr('class').split(" ");
		for( var i=0; i<classes.length;i++){
				if(classes[i]!="testtime"){
					obj.toggleClass(classes[i]);
				}
			}
	
	}
	
	
	
	
	var state="start";
	var behavior={
		
		start:function(){
			var elm = $("#visual .testtime")
			clear_classes(elm);
			elm.toggleClass('wait');
			
			elm.find("p").hide();
			elm.find(".waitText").show();
			
			
			state="wait";
			
			switch_random();
		},
		wait:function(){
			cancel_switch();
			
			var elm = $("#visual .testtime")
			
			clear_classes(elm);
			elm.toggleClass('scold');
			
			elm.find("p").hide();
			elm.find(".scoldText").show();
						
			state="scold";
		},
		scold:function(){
			var elm = $("#visual .testtime")
			
			clear_classes(elm);
			elm.toggleClass('wait');
			
			
			elm.find("p").hide();
			elm.find(".waitText").show();
					
			state="wait";
			
			switch_random();
		},
		wait2:function(){
			var elm = $("#visual .testtime");
			clear_classes(elm);
			elm.toggleClass('time');
			
			elm.find("p").hide();
			elm.find(".timeText").show();
			
			

			timeStart = performance.now();
			state="time";
			
		},
		time:function(){
			
			timeEnd= performance.now();			
			lagEnd = performance.now();
			reactionTime=Math.round(timeEnd-timeStart -(lagEnd-lagStart));
			
			var elm = $("#visual .testtime");
			clear_classes(elm);
			elm.toggleClass('result');
			
			
			elm.find("p").hide();
			elm.find(".resultText").text(reactionTime.toString());
			elm.find(".resultText").append(" click to play again");
			elm.find(".resultText").show();
			
			
			$("#results").append(reactionTime.toString());
			$("#results").append(" ");
			
			state="result";
		},
		result:function(){
			behavior["start"]();
		}
	};
	
	
	$("#visual .start").mousedown(function(){
		lagStart = performance.now();
		behavior[state]();
		
	});
	
	
	//visual test
	
	
	// $(".test").append('<form class="testtime"></form>')
	// $(".test .testtime").append('<input type="number " class="time"/>')
	// $(".test .testtime").append('<input type="submit" class="submit" value="Go"/>')
	// $(".test .testtime").submit(function(event){
		// alert("Handler for .submit() called.");
	// });
	//$(".test")
	
	
	//onchange="runTest($('#Tests').options[Tests.selectedIndex].text)"
	$("#Tests").change(function(){
		runTest($('#Tests').val());
	});
	
	
	
	
	
	
	
	
	
});

