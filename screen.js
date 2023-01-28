const stream = await navigator.mediaDevices.getDisplayMedia({
  video: { mediaSource: "screen" }
});

const recorder = new MediaRecorder(stream);

const chunks = [];
recorder.ondataavailable = e => chunks.push(e.data);

recorder.start();
setTimeout(() => recorder.stop(), 3000);

recorder.onstop = e => {
  const completeBlob = new Blob(chunks, { type: chunks[0].type });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(completeBlob);
  downloadLink.download = "screen-recording.webm";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};