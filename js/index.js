fetch("https://api.unsplash.com/photos/random", {
    headers: new Headers({ "Authorization": "Client-ID abce20a199d980e0a73bddb125bda9bae3e57b2dcb8c2a973177a25414e8076d" })
}).then(res => {
    res.json().then(j => {
        let img = new Image();
        img.addEventListener('load', e => {
            document.body.style.backgroundImage = "url(" + e.target.src + ")";
            document.getElementById("bumpme").style.display = "block";
        });
        img.src = j.urls.regular;
    }).catch(e => {
        console.log(e);
    });
}).catch(e => {
    console.log(e)
});

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

    window.ondevicemotion = function(eventData) {
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
};