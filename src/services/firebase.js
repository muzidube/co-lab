import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection('users').limit(10).get();

  const suggestions = result.docs
    .map((user) => ({
      ...user.data(),
      docId: user.id
    }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));

  return suggestions;
}

// updateFollowedUserFollowers, updateLoggedInUserFollowing

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId)
    });
}

export async function getPosts(userId, following) {
  const result = await firebase
    .firestore()
    .collection('posts')
    .where('userId', 'in', following)
    .get();

  const userFollowedPosts = result.docs.map((post) => ({
    ...post.data(),
    docId: post.id
  }));

  const postWithUserDetails = await Promise.all(
    userFollowedPosts.map(async (post) => {
      let userLikedPost = false;
      if (post.likes.includes(userId)) {
        userLikedPost = true;
      }
      const user = await getUserByUserId(post.userId);
      const { username } = user[0];
      return { username, ...post, userLikedPost };
    })
  );

  return postWithUserDetails;
}

export async function getAllPosts() {
  const result = await firebase.firestore().collection('posts').get();

  const allPosts = result.docs.map((post) => ({
    ...post.data(),
    docId: post.id
  }));

  const postWithUserDetails = await Promise.all(
    allPosts.map(async (post) => {
      let userLikedPost = false;
      const user = await getUserByUserId(post.userId);
      const { username } = user[0];
      return { username, ...post, userLikedPost };
    })
  );
  return postWithUserDetails;
}

export async function getUserPostsByUserId(userId) {
  const result = await firebase.firestore().collection('posts').where('userId', '==', userId).get();

  const posts = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return posts;
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername)
    .where('following', 'array-contains', profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  // 1st parameter: my doc id
  // 2nd parameter: person I am followings user id
  // 3rd parameter: am i following that person (true/false)
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);

  // 1st parameter: my user id
  // 2nd parameter: person I am followings doc id
  // 3rd parameter: am i following that person (true/false)
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}
