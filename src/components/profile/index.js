import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import { getUserByUsername, getUserPostsByUserId } from '../../services/firebase';

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
        <Header />
        <p>Hello {user.username}</p>
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