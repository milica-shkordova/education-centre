let capturedImgURL;

function initArtistCaptureImage() {
    const cameraLive = document.querySelector("video");
    const captureBtn = document.querySelector(".captureBtn");
    const canvas = document.querySelector("#capture ");

    navigator.mediaDevices
        .getUserMedia({
            video: {
                facingMode: "environment",
            },
        })
        .then((stream) => {
            cameraLive.srcObject = stream;
        });

    cameraLive.addEventListener("canplay", function () {
        canvas.width = cameraLive.width;
        canvas.height = cameraLive.height;
    });

    captureBtn.addEventListener("click", function () {
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(cameraLive, 0, 0, cameraLive.width, cameraLive.height);

        capturedImgURL = canvas.toDataURL("image/png");

        const stream = cameraLive.srcObject;
        const tracks = stream.getTracks();

        tracks[0].stop();
        cameraLive.src = "";

        window.location.hash = "#artistAddNewItemPage";

        document.querySelector(
            ".snapshot"
        ).innerHTML = `<img src="${capturedImgURL}" alt="captured-img" class="w-100 h-100 captured"></img>`;
    });
}
