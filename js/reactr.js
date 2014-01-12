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
	$(".testtime").append("<p1>click to start</p1>");
	$(".testtime").append("<p2 style='display: none;'>wait for the Cue</p2>");
	$(".testtime").append("<p3 style='display: none;'>Too Soon</p3>");
	$(".testtime").append("<p4 style='display: none;'>GO!!</p4>");
	$(".testtime").append("<p5 style='display: none;'></p5>");
	//$(".testtime").click(testsCode[$(".testtime").parents("div").attr("id")]);
	//TODO make actual tests code below used 2 submit times manually

	
	var switch_random=function(){
		timer1 = setTimeout(function() { behavior["time"](); }, 1000+Math.random()*2000);
	};
	var cancel_switch=function(){
		clearTimeout(timer1);
	}
	
	
	
	
	var state="start";
	var behavior={
		start:function(){
			var elm = $("#visual .testtime")
			elm.toggleClass('start');
			elm.toggleClass('wait');
			
			
			$("p1").slideToggle(5);
			$("p2").slideToggle(5);
			
			state="wait";
			
			switch_random();
		},
		wait:function(){
			cancel_switch();
			
			var elm = $("#visual .testtime")
			elm.toggleClass('wait');
			elm.toggleClass('scold');
			
			
			$("p2").slideToggle(5);
			$("p3").slideToggle(5);
			
			state="scold";
		},
		scold:function(){
			var elm = $("#visual .testtime")
			elm.toggleClass('scold');
			elm.toggleClass('wait');
			
			$("p2").slideToggle(5);
			$("p3").slideToggle(5);
		
			state="wait";
			
			switch_random();
		},
		time:function(){
			var elm = $("#visual .testtime");
			var classes=elm.attr('class').split(" ");
			for( var i=0; i<classes.length;i++){
				if(classes[i]!="testtime"){
					elm.toggleClass(classes[i]);
				}
			}
			elm.toggleClass('time');
			
			$("p2").slideToggle(0);
			$("p4").slideToggle(0);
			

			timeStart = performance.now();
			state="result";
			
		},
		result:function(){
			
			timeEnd= performance.now();			
			lagEnd = performance.now();
			reactionTime=Math.round(timeEnd-timeStart -(lagEnd-lagStart));
			
			$("p4").slideToggle(0);
			$("p5").slideToggle(0);
			$("p5").text(reactionTime.toString())
		
			
		}
	};
	
	
	$("#visual .start").click(function(){
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

