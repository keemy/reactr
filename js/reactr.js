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
	
	$(".test").append('<div class="testtime"></div>');
	$(".testtime").append("<p>click to start</p>");
	//$(".testtime").click(testsCode[$(".testtime").parents("div").attr("id")]);
	//TODO make actual tests code below used 2 submit times manually

	$("#visual .testtime").click(function(){
		$(this).toggleClass('yellow');
		$("p").slideToggle(5); 
		
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

