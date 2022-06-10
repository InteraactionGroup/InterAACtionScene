import { TestBed } from '@angular/core/testing';

import { AudioRecorderService } from './audio-recorder.service';

describe('AudioRecorderService', () => {
  let service: AudioRecorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioRecorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // check conditions to return specific asset url
  it('getRecValue:: should return value based on isRecording', () => {
    service.isRecording = false;
    expect(service.getRecValue()).toEqual('assets/images/rec_inactive.png');

    service.isRecording = true;
    expect(service.getRecValue()).toEqual('assets/images/rec_active.png');
  });

  // check if it sets specific variables after calling the function
  it('startRecording:: should start recording', () => {
    service.startRecording();
    expect(service.leftchannel).toEqual([]);
    expect(service.rightchannel).toEqual([]);
    expect(service.recorder).toEqual(null);
    expect(service.recordingLength).toEqual(0);
    expect(service.volume).toEqual(null);
    expect(service.mediaStream).toEqual(null);
    expect(service.context).toEqual(null);
    expect(service.blob).toEqual(null);
    expect(service.view).toEqual(null);
    expect(service.isRecording).toBeTruthy();
  });

  // check if it sets specific variables after calling the function
  it('startRecording:: should start recording', () => {
    spyOn(service, 'goToSuccess');
    spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(((new Promise(resolve => resolve(true)))) as any);
    service.startRecording();
    expect(service.leftchannel).toEqual([]);
    expect(service.rightchannel).toEqual([]);
    expect(service.recorder).toEqual(null);
    expect(service.recordingLength).toEqual(0);
    expect(service.volume).toEqual(null);
    expect(service.mediaStream).toEqual(null);
    expect(service.context).toEqual(null);
    expect(service.blob).toEqual(null);
    expect(service.view).toEqual(null);
    expect(service.isRecording).toBeTruthy();
  });

  // check if it sets specific variables after calling the function
  it('goToSuccess:: should success the process for steaming', () => {
    service.context = { createMediaStreamSource: () => ({connect: (val) => {}}),
      createScriptProcessor: () => ({ connect: (val) => {}, onaudioprocess: () => true})};
    spyOn(window, 'AudioContext').and.returnValue({ createMediaStreamSource: () => ({connect: (val) => {}}),
      createScriptProcessor: () => ({ connect: (val) => {}, onaudioprocess: () => true})} as any);
    spyOn(service.context, 'createMediaStreamSource').and.returnValue({ connect: (val) => {} });
    spyOn(service.context, 'createScriptProcessor').and.returnValue({ connect: (val) => {}, onaudioprocess: () => true });
    service.goToSuccess(new MediaStream());
    expect(service).toBeTruthy();
  });

  // check if it sets specific variables after calling the function
  it('stopRecording:: should stop recording', () => {
    service.context = { destination: true };
    service.recorder = { disconnect: () => {} } as any;
    service.mediaStream = { mediaStream: { getTracks: () => [{ stop: () => {} }] }, disconnect: () => {} } as any;
    service.stopRecording();
    expect(service.view).toBeDefined();
  });

  // check if it sets specific variables after calling the function
  it('stopRecording:: should stop recording', () => {
    service.context = { destination: true };
    service.recorder = null;
    service.mediaStream = { mediaStream: { getTracks: () => [{ stop: () => {} }] }, disconnect: () => {} } as any;
    spyOn(service, 'interleave').and.returnValue([1, 2, 3] as any);
    service.stream = { getAudioTracks: () => [{ stop: () => {} }] };
    service.stopRecording();
    expect(service.view).toBeDefined();
  });

  // check if it sets specific variables after calling the function
  it('playRecording:: should play recording', () => {
    service.view = [1, 2, 3];
    service.playRecording();
    expect(service.view).toBeDefined();
  });

  // check if it is returns specific variables after calling the function
  it('getRecord:: should return record', () => {
    service.view = [];
    expect(service.getRecord()).toBeDefined();
  });
});
