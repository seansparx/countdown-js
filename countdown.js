

var serverTime = SERVER_TIME; //this would come from the server obviously.
var localTime = Date.now();
timeDiff = serverTime - localTime;



function displayCountdown(endtime, counter) {

    var id = 'clockDisplay_' + counter;

    initializeClock(endtime);



    function getTimeRemaining(endtime)
    {
        console.log(timeDiff);
        var t = Date.parse(endtime) - eval(Date.now()+timeDiff);

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
            'minutes':minutes,
            'seconds': seconds
        };
    }


    function initializeClock(endtime) {
        //var clock = document.getElementById(id);
        var timeinterval = setInterval(function() {
            var t = getTimeRemaining(endtime);
            var timer = t.days + ':' + t.hours + ':' + t.minutes + ':' + t.seconds;
            document.getElementById("clockDisplay_" + counter).innerHTML = timer;
            if(timer == '00:00:00:00') {
                $("#clockDisplay_" + counter).parent('.time-detail').prev('a').fadeOut();
                $("#clockDisplay_" + counter).parent('.time-detail').prev('a').prev('a').children('h4').fadeOut();
                $("#clockDisplay_" + counter).parent('.time-detail').fadeOut();
            }
            if (t.total <= 0) {
                clearInterval(timeinterval);
                document.getElementById("clockDisplay_" + counter).innerHTML = '00' + ':00' + ':00' + ':00';
            }
        }, 1000);
    }

}


$(document).ready(function() {

    $("#org_launch_challenge #days, #org_launch_challenge #hours, #org_launch_challenge #minutes").keyup(function(){
        var elm = $(this);
        var value = elm.val();

        switch(elm.attr('name')) {
            case 'days'    : break;

            case 'hours'   : if(value > 23){ elm.val('23'); } break;

            case 'minutes' : if(value > 59){ elm.val('59'); } break;
        }
    });

    $("#org_launch_challenge #days, #org_launch_challenge #hours, #org_launch_challenge #minutes").change(function(){

        var days  = $("#org_launch_challenge #days").val();
            days = days ? days : 0;

        var hours = $("#org_launch_challenge #hours").val();
            hours = hours ? hours : 0;

        var minut = $("#org_launch_challenge #minutes").val();
            minut = minut ? minut : 0;

        var dhsum = eval( parseInt(days) + parseInt(hours) );

        if((dhsum == 0) && ((minut != '') && (minut < 30))){
            alert('The minimum duration of a challenge is 30 minutes.');
            $("#org_launch_challenge #minutes").val('30');
        }
    });

});

