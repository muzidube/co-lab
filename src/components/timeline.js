import Skeleton from 'react-loading-skeleton';
import usePosts from '../hooks/use-posts';
import Post from './post';

export default function Timeline() {
    const { posts } = usePosts();
    return <div className = 'container col-span-2'>
        {!posts ? (
                <Skeleton count = {4} width = {640} height = {500} className = 'mb-5'/>
        ) : posts?.length > 0 ? (
            posts.map((content) => <Post key = {content.docId} content = {content}/>)
        ) : (
            <p className = 'text-center text-2xl'>Follow people to see posts</p>
        )}
    </div>;
}