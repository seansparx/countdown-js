
function displayCountdown(endtime, counter) {

    var serverTime = (SERVER_TIME * 1); //this would come from the server obviously.

    var svr = new Date(serverTime); 
    var svr_utc = new Date(svr.getUTCFullYear(),svr.getUTCMonth(),svr.getUTCDate(),svr.getUTCHours(),svr.getUTCMinutes(),svr.getUTCSeconds());

    var now = new Date(); 
    var now_utc = new Date(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate(),now.getUTCHours(),now.getUTCMinutes(),now.getUTCSeconds());

    var localTime  = now_utc.getTime();
	serverTime = svr_utc.getTime();
	timeDiff   = serverTime - localTime;

    var id = 'clockDisplay_' + counter;

    initializeClock(endtime);

    function getTimeRemaining(endtime)
    {
	var now = new Date();
	var d2 = new Date(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate(),now.getUTCHours(),now.getUTCMinutes(),now.getUTCSeconds());

	var d3 = new Date(endtime);
	var d4 = new Date( d3.getFullYear(), d3.getMonth(), d3.getDate(), d3.getHours(), d3.getMinutes(), d3.getSeconds() );

	if(d4.getTime() < (d2.getTime() + timeDiff) ){
		return {
		    'total': 0,
		    'days': 0,
		    'hours': 0,
		    'minutes': 0,
		    'seconds': 0
		};
	}

	var t = Math.abs(d4.getTime() - (d2.getTime() + timeDiff) );

        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));

        if (days < 10) {
            days = "0" + days;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (hours < 10) {
            hours = "0" + (hours);
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function initializeClock(endtime) {
        //var clock = document.getElementById(id);
        var timeinterval = setInterval(function() {
            var t = getTimeRemaining(endtime);
            var timer = t.days + ':' + t.hours + ':' + t.minutes + ':' + t.seconds;
            document.getElementById("clockDisplay_" + counter).innerHTML = timer;
            if (timer == '00:00:00:00') {
                $("#clockDisplay_" + counter).parent('.time-at-chall-list').prev('a').fadeOut();
                $("#clockDisplay_" + counter).parent('.time-at-chall-list').prev('a').prev('a').children('h4').fadeOut();
                $("#clockDisplay_" + counter).parent('.time-at-chall-list').fadeOut();
            }
            if (t.total <= 0) {
                clearInterval(timeinterval);
                document.getElementById("clockDisplay_" + counter).innerHTML = '00' + ':00' + ':00' + ':00';
            }
        }, 1000);
    }

}


$(document).ready(function() {

    $("#org_launch_challenge #days, #org_launch_challenge #hours, #org_launch_challenge #minutes").keyup(function() {
        var elm = $(this);
        var value = elm.val();

        switch (elm.attr('name')) {
            case 'days'    :
                break;

            case 'hours'   :
                if (value > 23) {
                    elm.val('23');
                }
                break;

            case 'minutes' :
                if (value > 59) {
                    elm.val('59');
                }
                break;
        }
    });

    $("#org_launch_challenge #days, #org_launch_challenge #hours, #org_launch_challenge #minutes").change(function() {

        var days = $("#org_launch_challenge #days").val();
        days = days ? days : 0;

        var hours = $("#org_launch_challenge #hours").val();
        hours = hours ? hours : 0;

        var minut = $("#org_launch_challenge #minutes").val();
        minut = minut ? minut : 0;

        var dhsum = eval(parseInt(days) + parseInt(hours));

        if ((dhsum == 0) && ((minut == 0) || (minut < 10))) {
            alert('The minimum duration of a challenge is 10 minutes.');
            $("#org_launch_challenge #minutes").val('10');
        }
    });





    $("#org_launch_challenge #days, #org_launch_challenge #hours, #org_launch_challenge #minutes").change(function() {
        var elm = $(this);
        var value = elm.val();
        if(value.length > 3){
             var days=value.substr(0,3);
             elm.val(days);
        }
        if (value < 10 && value.length < 2) {
            var value = elm.val('0' + value);
        }
       
    });
    
    $("#org_launch_challenge #days").keyup(function() {
        
        var elm = $(this);
        var value = elm.val();
        if(value.length > 3){
             var days=value.substr(0,3);
             elm.val(days);
        }
     
    });
    
    


});
