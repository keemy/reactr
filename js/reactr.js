var listOfTests=["sound","visual"];

$( document ).ready(function() {
	function IncrementAndReturn(){
			$.ajax("backendtest.py").done(function(data){
			$("#counter").text(data);
		});
	}
	
	$("#counter").click(function(){
		IncrementAndReturn();
	});
	

	
	
	var f1=function(event){
		alert("f1");
	};
	var f2=function(event){
		alert("f2");
	};
	
	
	
	
});

