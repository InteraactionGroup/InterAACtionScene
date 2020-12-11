import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {

  leftchannel = [];
  rightchannel = [];
  recorder = null;
  recordingLength = 0;
  volume = null;
  mediaStream = null;
  sampleRate = 44100;
  context = null;
  blob = null;
  view = null;

  constructor() {
  }

  enregistrer() {

    this.leftchannel = [];
    this.rightchannel = [];
    this.recorder = null;
    this.recordingLength = 0;
    this.volume = null;
    this.mediaStream = null;
    this.sampleRate = 44100;
    this.context = null;
    this.blob = null;
    this.view = null;


    navigator.getUserMedia(
      {
        audio: true
      },
      (e) => {
        this.goToSuccess(e);
      },
      (e) => {
        this.goToError(e);
      }
    );
  }

  goToSuccess(e) {
    this.context = new AudioContext();
    this.mediaStream = this.context.createMediaStreamSource(e);
    let bufferSize = 2048;
    let numberOfInputChannels = 2;
    let numberOfOutputChannels = 2;
    if (this.context.createScriptProcessor) {
      this.recorder = this.context.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);
    } else {
      this.recorder = this.context.createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels);
    }
    this.recorder.onaudioprocess = (e) => {
      console.log("on audio progress");
      this.leftchannel.push(new Float32Array(e.inputBuffer.getChannelData(0)));
      this.rightchannel.push(new Float32Array(e.inputBuffer.getChannelData(1)));
      this.recordingLength += bufferSize;
    };
    this.mediaStream.connect(this.recorder);
    this.recorder.connect(this.context.destination);
  }

  goToError(e) {
    console.error(e);
  }

  stopRecording() {
    // stop recording
    console.log("stop recording");
    this.recorder.disconnect(this.context.destination);
    this.mediaStream.disconnect(this.recorder);

    // we flat the left and right channels down
    let leftBuffer = this.flattenArray(this.leftchannel, this.recordingLength); // flattenArray is on GitHub (see below)
    let rightBuffer = this.flattenArray(this.rightchannel, this.recordingLength);

    // we interleave both channels together
    let interleaved = this.interleave(leftBuffer, rightBuffer); // interleave is on GitHub (see below)

    // we create our wav file
    let buffer = new ArrayBuffer(44 + interleaved.length * 2);
    this.view = new DataView(buffer);

    // RIFF chunk descriptor
    this.writeUTFBytes(this.view, 0, 'RIFF');
    this.view.setUint32(4, 44 + interleaved.length * 2, true);
    this.writeUTFBytes(this.view, 8, 'WAVE');

    // FMT sub-chunk
    this.writeUTFBytes(this.view, 12, 'fmt ');
    this.view.setUint32(16, 16, true); // chunkSize
    this.view.setUint16(20, 1, true); // wFormatTag
    this.view.setUint16(22, 2, true); // wChannels: stereo (2 channels)
    this.view.setUint32(24, this.sampleRate, true); // dwSamplesPerSec
    this.view.setUint32(28, this.sampleRate * 4, true); // dwAvgBytesPerSec
    this.view.setUint16(32, 4, true); // wBlockAlign
    this.view.setUint16(34, 16, true); // wBitsPerSample

    // data sub-chunk
    this.writeUTFBytes(this.view, 36, 'data');
    this.view.setUint32(40, interleaved.length * 2, true);

    // write the PCM samples
    let index = 44;
    let volume = 1;
    for (let i = 0; i < interleaved.length; i++) {
      this.view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
      index += 2;
    }
  }

  playRecording(){
    // our final blob
    let blob = new Blob([this.view], {type: 'audio/wav'});
    let url = window.URL.createObjectURL(blob);
    let audio = new Audio(url);
    audio.play();
  }

  flattenArray(channelBuffer, recordingLength) {
    let result = new Float32Array(recordingLength);
    let offset = 0;
    for (let i = 0; i < channelBuffer.length; i++) {
      let buffer = channelBuffer[i];
      result.set(buffer, offset);
      offset += buffer.length;
    }
    return result;
  }

  interleave(leftChannel, rightChannel) {
    let length = leftChannel.length + rightChannel.length;
    let result = new Float32Array(length);

    let inputIndex = 0;

    for (let index = 0; index < length;) {
      result[index++] = leftChannel[inputIndex];
      result[index++] = rightChannel[inputIndex];
      inputIndex++;
    }
    return result;
  }

  writeUTFBytes(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

}
