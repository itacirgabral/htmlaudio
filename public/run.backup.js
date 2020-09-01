const bt = document.getElementById('bt')
const recorderOptions = {mimeType: 'audio/webm'}

let rec = false
let mediaStream
let mediaRecorder
let recordedChunks = []

bt.onclick = async () => {
  if(rec){
    // pede e liga o mic
    mediaStream = await navigator
    .mediaDevices
    .getUserMedia({
      audio: true,
      video: false
    })

    // cria o gravador
    mediaRecorder = new MediaRecorder(mediaStream, recorderOptions)

    mediaRecorder.addEventListener('dataavailable', e => {
      // se no momento da gravação o usuário soltar o botão
      if(!rec) {
        // para de gravar
        mediaRecorder.stop()
        console.log(`stop button`)
      } else if (e.data.size > 0) {
        // senao guarda os pedaços
        recordedChunks.push(e.data)
      }

      // quando parar de gravar
      mediaRecorder.addEventListener('stop', () => {
        // gera um link sintético pra baixar o arquivo
        console.log(`rec file ${URL.createObjectURL(new Blob(recordedChunks))}`)
        console.log(`stop event`)
      })

      mediaRecorder.start()
    })


    bt.innerText = '0'
    rec = !rec
  } else {
    bt.innerText = '1'
    rec = !rec
  }
}

/*
// ou para um mic específico
navigator
  .mediaDevices
  .enumerateDevices()
  .then(
    (devices) => devices.filter((d) => d.kind === 'audioinput'))
  .then(
    console.dir)

navigator.mediaDevices.getUserMedia({
  audio: {
    deviceId: devices[0].deviceId
  }
})
*/
const deniedCheck = result => {
  if (result.state == 'denied') {
    console.log('Eu preciso do mic')
  } 
}
navigator.permissions.query({ name:'microphone' }).then(function(result) {
  deniedCheck(result)
  result.onchange = deniedCheck
});