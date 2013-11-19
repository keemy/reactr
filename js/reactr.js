var listOfTests=["sound","visual"];
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
		$("#"+type).css("display","inline-block");
	}
	for(var i=0 ; i<listOfTests.length; i++){
		$("#container").append("<div class=test id="+listOfTests[i]+" style='display: none;'>test "+listOfTests[i]+" </div");
	}
	
	runTest("visual");
	
	
	
	
	
	
	
	
	
});

