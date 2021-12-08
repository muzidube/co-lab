import { useState, useEffect } from 'react';
import { getAllPosts } from '../services/firebase';

export default function usePosts() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function getTimelinePosts() {          
        const guestExamplePosts = await getAllPosts();
        guestExamplePosts.sort((a, b) => b.dateCreated - a.dateCreated);
        setPosts(guestExamplePosts);     
    }

    getTimelinePosts();
  }, []);

  return { posts };
}