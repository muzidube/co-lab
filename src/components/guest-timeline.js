import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getAllPosts } from '../services/firebase';
import Post from './post';

export default function GuestTimeline() {
  const [posts, setPosts] = useState('');

  const fetchPosts = async () => {
    await getAllPosts()
      .then((res) => res.sort((a, b) => parseFloat(b.dateCreated) - parseFloat(a.dateCreated)))
      .then((res) => setPosts(res));
  };
  fetchPosts();
  return (
    <div className="guest-timeline container col-span-2">
      {!posts ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : (
        posts.map((content) => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
}
