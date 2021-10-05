import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import PostContent from './post-content';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';
export default function Post({content}) {
    const commentInput = useRef(null);

    const handleFocus = () => commentInput.current.focus();
    // header, image, actions (like & comment), footer, comments

    return (
        <div className = 'rounded col-span-4 border bg-white border-gray-primary mb-12'>
            <Header username ={content.username} />
            <PostContent src ={content.postSrc} caption = {content.caption} />
            <Actions
                docId = {content.docId}
                totalLikes = {content.likes.length}
                likedPost = {content.userLikedPost}
                handleFocus = {handleFocus}
            />
            <Footer caption = {content.caption} username = {content.username} />
            <Comments 
                docId = {content.docId}
                comments = {content.comments}
                posted = {content.dateCreated}
                commentInput = {commentInput}
            />

        </div>
    )
}

Post.propTypes ={
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        postSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPost: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired

    })
}