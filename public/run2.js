if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');
  const bt = document.getElementById('bt')
  
  // quando aperta o botão
  bt.onmousedown = () => {
    bt.innerText = 'gravando 1'

    navigator
      .mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream)
        const chunks = []

        mediaRecorder.ondataavailable = e => {
          chunks.push(e.data)
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' })
          const url = window.URL.createObjectURL(blob)
          console.dir({ url, blob })
        }

        mediaRecorder.start()

        // solta
        bt.onmouseup = () => {
          bt.innerText = 'gravando 0'
          mediaRecorder.stop()
        }
      })
      .catch(err => {
        console.error('The following getUserMedia error occured: ' + err);
      })
  }
} else {
  console.log('getUserMedia not supported on your browser!');
}