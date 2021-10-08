import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Posts from './posts';
import { getUserPostsByUserId } from '../../services/firebase';

export default function Profile({user}) {
    const reducer = (state, newState) => ({...state, ...newState });

    const initialState = {
        profile: {},
        postCollection: [],
        followerCount: 0
    };
    
    const [{ profile, postCollection, followerCount }, dispatch] =
    useReducer(reducer, initialState);

    useEffect(() => {
        async function getProfileInfoAndPosts() {
            const posts = await getUserPostsByUserId(user.userId);
            dispatch({ profile: user, postCollection: posts, followerCount: user.followers.length});
        }

        getProfileInfoAndPosts();

    },  [user.userId])

    return (
    <>
        <Header 
            postCount = {postCollection ? postCollection.length : 0}
            profile = {profile}
            followerCount = {followerCount}
            setFollowerCount = {dispatch}
        />
        <Posts posts = {postCollection} />
    </>
    )
}

Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    }).isRequired
}