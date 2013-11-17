var listOfTests=["sound","visual"];

$( document ).ready(function() {
	function IncrementAndReturn(){
		$.ajax("backendtest.py").done(function(data){
			$("#counter").text(data);
		});
	}
	function CounterValue(){
		$.ajax("backendtest.py?readonly=true").done(function(data){
			$("#counter").text(data);
		});
	}
	
	IncrementAndReturn();
	
	$("#counter").click(function(){
		IncrementAndReturn();
	});
	
	function CounterValueCaller(){
		CounterValue();
		setTimeout(CounterValueCaller,500);
	}
	CounterValueCaller();
	
	
	var f1=function(event){
		alert("f1");
	};
	var f2=function(event){
		alert("f2");
	};
	
	
	
	
});

