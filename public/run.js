/*
// caso precise escolher qual mic e como ligar/desligar eles
const AudioContext = window.AudioContext || window.webkitAudioContext;
const sourceNode = await navigator.mediaDevices.getUserMedia({ audio : true }).then( ( stream ) => {
  const context = new AudioContext();
  return context.createMediaStreamSource( stream );
});
*/

const options = {
  encoderPath: "encoderWorker.min.js"
  // sourceNode // optional An Instance of MediaStreamAudioSourceNode to use. If a sourceNode is provided, then closing the stream and audioContext will need to be managed by the implementation.
}

if (Recorder.isRecordingSupported()) {
  const bt = document.getElementById('bt')
    // quando aperta o botão
    bt.onmousedown = () => {
      bt.innerText = 'gravando 1'

      // quando solta o botão
      bt.onmouseup = () => {
        bt.innerText = 'gravando 0'
      }
    }
}