<?php

define('VIDEO_PATH', 'videos/');

// read directory videos
$handle = opendir('./' . VIDEO_PATH);
$videosList = [];
while (($file = readdir($handle)) !== false) {
    if (!in_array($file, array('.', '..'))) {
        //be sure to ignore . and .., current and parent directories!
        $videosList[] = $file;
    }
}
closedir($handle);
asort($videosList);
$videosList = array_values($videosList);

?>
<!DOCTYPE html>
<html>
<head>
    <title>Video Study</title>

    <link rel="stylesheet" href="style.css">
    <script src="pageBaseUi.js" type="text/javascript"></script>
    <script src="pageVideo.js" type="text/javascript"></script>

</head>
<body>

    <h1>Video Study</h1>

    <label for="video-select">Select video:</label>
    <select id="video-select">
        <option value="" disabled selected>Choose a video</option>
    </select>

    <br/>
    <div class="button-bar">
        <button onclick="pageVideo().actionToggleFullScreen()">Full-Screen (F)</button>
        <button onclick="pageVideo().videoSlow()">Slow Down (↓)</button>
        <button onclick="pageVideo().videoFast()">Fast Forward (↑)</button>
    </div>

    <div id="video-container">
        <video id="video-player" controls width="600">
            Your browser does not support the video tag.
        </video>
    </div>

    <hr/>
    <svg
        id="signet_start"
        class="signet"
        version="1.0" x="0px" y="0px"
        viewBox="0 0 750 850"
        style="enable-background:new 0 0 750 850;"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg">
        <g
            id="g1"
            transform="matrix(-1,0,0,1,808.39265,-304.04491)">
            <path
                d="M 135.823,597.956 V 434.063 c 0,-47.827 38.91,-86.737 86.737,-86.737 10.591,0 20.936,1.887 30.746,5.608 16.285,6.174 30.211,17.005 40.272,31.321 10.284,14.632 15.719,31.855 15.719,49.808 v 163.893 z"
                id="path1" />
            <path
                d="m 732.604,1101.402 c 0,7.144 -3.928,13.066 -10.509,15.843 -6.581,2.776 -13.561,1.459 -18.676,-3.522 L 551.878,966.129 c -12.993,-12.657 -33.349,-12.656 -46.343,-10e-4 l -151.542,147.594 c -5.115,4.983 -12.096,6.298 -18.676,3.522 -6.581,-2.776 -10.509,-8.699 -10.509,-15.843 V 434.063 c 0,-21.162 -6.411,-41.47 -18.539,-58.727 -7.96,-11.327 -17.978,-20.803 -29.515,-28.01 h 369.122 c 26.284,0 50.857,11.727 67.419,32.176 12.452,15.357 19.309,34.734 19.309,54.562 z"
                id="path2" />
            <path
                fill="#ffffff"
                d="m 510.839,371.525 h 137.7 c 27.941,0 50.592,22.651 50.592,50.592 v 158.316 c 0,0 2.749,-184.71 -188.292,-208.908 z"
                id="path3" />
        </g>
    </svg>

    <svg
        id="signet_end"
        class="signet"
        version="1.0" x="0px" y="0px"
        viewBox="0 0 750 850"
        style="enable-background:new 0 0 750 850;"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg">
        <g
            id="g1"
            transform="translate(-60.034346,-304.04491)">
            <path
                d="M 135.823,597.956 V 434.063 c 0,-47.827 38.91,-86.737 86.737,-86.737 10.591,0 20.936,1.887 30.746,5.608 16.285,6.174 30.211,17.005 40.272,31.321 10.284,14.632 15.719,31.855 15.719,49.808 v 163.893 z"
                id="path1" />
            <path
                d="m 732.604,1101.402 c 0,7.144 -3.928,13.066 -10.509,15.843 -6.581,2.776 -13.561,1.459 -18.676,-3.522 L 551.878,966.129 c -12.993,-12.657 -33.349,-12.656 -46.343,-10e-4 l -151.542,147.594 c -5.115,4.983 -12.096,6.298 -18.676,3.522 -6.581,-2.776 -10.509,-8.699 -10.509,-15.843 V 434.063 c 0,-21.162 -6.411,-41.47 -18.539,-58.727 -7.96,-11.327 -17.978,-20.803 -29.515,-28.01 h 369.122 c 26.284,0 50.857,11.727 67.419,32.176 12.452,15.357 19.309,34.734 19.309,54.562 z"
                id="path2" />
            <path
                fill="#ffffff"
                d="m 510.839,371.525 h 137.7 c 27.941,0 50.592,22.651 50.592,50.592 v 158.316 c 0,0 2.749,-184.71 -188.292,-208.908 z"
                id="path3" />
        </g>
    </svg>


    <script type="text/javascript">
      const videos = <?= json_encode($videosList) ?>;
      pageVideo().provideVideoList(videos, '<?= VIDEO_PATH ?>')
    </script>
    </body>

</html>


