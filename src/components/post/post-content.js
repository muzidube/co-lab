import PropTypes from 'prop-types';
import Waveform from './waveform';

export default function PostContent({ src, caption, postId, track }) {
  return (
    <div>
      <img className="w-full" src={src} alt={caption} />
      <div className="">
        <Waveform postId={postId} track={track} />
      </div>
    </div>
  );
}

PostContent.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired
};
