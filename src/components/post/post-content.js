import PropTypes from 'prop-types';

export default function PostContent({src, caption}) {
    return (
        <img src = {src} aboutlt = {caption} />
    )
};

PostContent.propTypes = {
src: PropTypes.string.isRequired,
caption: PropTypes.string.isRequired,
};