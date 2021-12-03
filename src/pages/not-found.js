import { useEffect } from 'react';
import Header from '../components/header';
import Waveform from '../components/post/waveform';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found - Co-Lab';
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div ClassName="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Not Found!</p>
        <Waveform />
      </div>
    </div>
  );
}
