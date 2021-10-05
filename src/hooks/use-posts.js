import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getPosts, getUserByUserId } from '../services/firebase';

export default function usePosts() {
    const [posts, setPosts] = useState(null);

    const {
        user: { uid: userId = '' }
     } = useContext(UserContext);

        useEffect(() => {
            async function getTimelinePosts() {
                const [{following}] = await getUserByUserId(userId);
                let followedUserPosts = [];

                if (following.length > 0) {
                    followedUserPosts = await getPosts(userId, following)
                }

                followedUserPosts.sort((a,b) => b.dateCreated - a.dateCreated);
                setPosts(followedUserPosts);
            }

            getTimelinePosts();
        }, [userId]);

    return { posts };
}
