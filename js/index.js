if ("LinearAccelerationSensor" in window) {
    let accelerometer = new LinearAccelerationSensor();
    accelerometer.addEventListener(
        "reading",
        e => {
            accelerationHandler(accelerometer);
        },
        true
    );
    accelerometer.start();
} else if ("DeviceMotionEvent" in window) {

    window.ondevicemotion =  function(eventData) {
        accelerationHandler(eventData.acceleration);
    };
} else {
    document.getElementById("bump").innerHTML =
        "No Accelerometer & Gyroscope API available";
}

var maxAccel = 0;

function accelerationHandler(acceleration) {
    let accel = Math.sqrt(
        acceleration.x * acceleration.x +
        acceleration.y * acceleration.y +
        acceleration.z * acceleration.z
    );
    if (accel > 30) {
        document.getElementById("bump").style.display = "block";
        document.getElementById("bumpme").style.display = "none";
    }
}

document.getElementById("bump").onclick = function(e) {
        document.getElementById("bump").style.display = "none";
        document.getElementById("bumpme").style.display = "block";
}