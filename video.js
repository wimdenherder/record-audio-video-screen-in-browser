let mediaRecorder;

const startRecording = () => {
  mediaRecorder.start();
};

const stopRecording = () => {
  mediaRecorder.stop();
};

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    mediaRecorder = new MediaRecorder(stream);
    startRecording();
    setTimeout(stopRecording, 5000)
    const videoChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      videoChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      const videoBlob = new Blob(videoChunks);
      const videoUrl = URL.createObjectURL(videoBlob);
      // const video = new Video(videoUrl);
      // video.play();
      const downloadLink = document.createElement("a");
      downloadLink.href = videoUrl;
      downloadLink.download = "recording.webm";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
    
  })
  .catch(console.error);
