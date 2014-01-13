$( document ).ready(function() {
	

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
	
});