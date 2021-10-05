import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import PostContent from './post-content';

export default function Post({content}) {
    // header, image, actions (like & comment), footer, comments

    return (
        <div className = 'rounded col-span-4 border bg-white border-gray-primary mb-12'>
            <Header username ={content.username} />
            <PostContent src ={content.postSrc} caption = {content.caption} />
        </div>
    )
}

Post.propTypes ={
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPost: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired

    })
}