import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import usePosts from '../hooks/use-guest-posts';
import Post from './post';

export default function GuestTimeline() {
  const { posts } = usePosts();
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
