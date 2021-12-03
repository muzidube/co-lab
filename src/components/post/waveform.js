import { useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

export default function Waveform({ postId, track }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    document.querySelector(`.wave-${postId}`).innerHTML = '';

    const waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: `.wave-${postId}`,
      backend: 'WebAudio',
      height: 80,
      progressColor: '#46dfcd',
      responsive: true,
      waveColor: '',
      cursorColor: 'transparent'
    });

    waveform.load(track);
    const handlePlay = () => {
      playing ? setPlaying(false) : setPlaying(true);

      console.log(playing);
      waveform.playPause();
    };

    document.querySelector(`.play-button-${postId}`).addEventListener('click', handlePlay);

    console.log(playing);
  }, [postId, track]);

  const playButton = playing ? (
    <button
      className={`play-button-${postId} flex content-center items-center w-12 h-12 bg-transparent rounded-50% border-none outline-none cursor-pointer mb-3`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  ) : (
    <button
      className={`play-button-${postId} flex content-center items-center w-12 h-12 bg-transparent rounded-50% border-none outline-none cursor-pointer mb-3`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );

  return (
    <div className="waveform-container flex flex-row items-center content-center h-24 w-full bg-transparent px-4">
      {playButton}
      <div className={`wave-${postId} w-full h-full ml-2`} id="waveform" />
    </div>
  );
}
