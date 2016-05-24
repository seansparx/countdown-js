<html>
<head>
<script>
SERVER_TIME = '<?php echo strtotime(gmdate("Y-m-d H:i:s")) ; ?>';
</script>
 <script type="text/javascript" src="jquery-1.10.2.min.js"></script>
 <script type="text/javascript" src="countdown.js"></script>

 <script>
    $(document).ready(function () {
        $('.clockDisplay').each(function () {
            var finalDate = $(this).data('coundown');
            var startDate = $(this).data('launch');
            var counter = $(this).data('counter');
            //alert(counter);
            displayCountdown(finalDate, counter);

        });
    });

</script>

</head>
<body>
<br/><br/>
<span id="clockDisplay_1" class="clockDisplay" data-counter="1" data-coundown="May 04 2016 21:32:30"></span>
</body>
</html>
