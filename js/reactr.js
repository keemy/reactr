var listOfTests=["sound","visual","visual2"];
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


