import { useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

export default function Waveform({ postId, track }) {
  let playing = false;

  useEffect(() => {
    document.querySelector(`.wave-${postId}`).innerHTML = '';

    const waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: `.wave-${postId}`,
      backend: 'WebAudio',
      height: 80,
      progressColor: '#2D5BFF',
      responsive: true,
      waveColor: 'red',
      cursorColor: 'transparent'
    });

    waveform.load(track);
    const handlePlay = () => {
      playing = !playing;
      waveform.playPause();
    };

    document.querySelector(`.play-button-${postId}`).addEventListener('click', handlePlay);
  }, []);
  return (
    <div className="waveform-container flex flex-row items-center content-center h-24 w-full bg-transparent px-4">
      <button
        className={`play-button-${postId} flex content-center items-center w-10 h-10 bg-red-primary rounded-50% border-none outline-none cursor-pointer mb-3`}
      />
      <div className={`wave-${postId} w-full h-full ml-2`} id="waveform" />
    </div>
  );
}
