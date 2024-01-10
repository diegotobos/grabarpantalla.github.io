const $startButton = document.getElementById('startButton');
const $stopButton = document.getElementById('stopButton');
let mediaRecorder;
let mediaStream;

$startButton.addEventListener('click', async () => {
  mediaStream = await navigator.mediaDevices.getDisplayMedia({
    video: { frameRate: { ideal: 30 } },
    audio: { // Agregamos opciones de audio para capturar el audio del sistema
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100 // Puedes ajustar este valor según tus necesidades
    }
  });

  // Cambiamos la MediaRecorder para capturar toda la mediaStream (audio y video)
  mediaRecorder = new MediaRecorder(mediaStream);

  mediaRecorder.addEventListener('dataavailable', (e) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(e.data);
    link.download = 'captura.webm';
    link.click();
  });

  $startButton.disabled = true;
  $stopButton.disabled = false;

  mediaRecorder.start();
});

$stopButton.addEventListener('click', () => {
  $startButton.disabled = false;
  $stopButton.disabled = true;

  mediaRecorder.stop();
  mediaStream.getTracks().forEach(track => track.stop());
});
