var listOfTests=["sound","visual"];

$( document ).ready(function() {
	$.ajax("backendtest.py").done(function(data){$("#counter").text(data);});

	
	
	
	var f1=function(event){
	alert("f1");
	};
	var f2=function(event){
	alert("f2");
	};
	
	
	
	
});

