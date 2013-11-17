var listOfTests=["sound","visual"];

$( document ).ready(function() {
	for(var i=0; i<listOfTests.length;i++){
		$("").append('<div class="timer">woo</div>')
	}
	
	var f1=function(event){
	alert("f1");
	};
	var f2=function(event){
	alert("f2");
	};
	
	$(".listener").click(f1);
	
	
});

