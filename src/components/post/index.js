import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import PostContent from './post-content';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';
export default function Post({ content }) {
  const commentInput = useRef(null);

  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12 w-full">
      <Header username={content.username} />
      <PostContent
        src={content.imgSrc}
        caption={content.caption}
        postId={content.postId}
        track={content.postSrc}
      />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPost={content.userLikedPost}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPost: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired
  })
};
