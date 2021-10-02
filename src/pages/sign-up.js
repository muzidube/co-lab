import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';


export default function SignUp() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const isInvalid = password === '' || emailAddress === '';

    const handleSignUp = async (event) => {
        event.preventDefault();

        const usernameExists = await doesUsernameExist(username);
        if (!usernameExists.length) {
            try {
              const createdUserResult = await firebase
              .auth()
              .createUserWithEmailAndPassword(emailAddress, password);

              // authentication
                // -> emailAddress & password & username (displayName)
              
            await createdUserResult.user.updateProfile({
                displayName: username
            });

            // firebase
                // -> user collection (create a document)

            await firebase.firestore().collection('users').add({
                userId: createdUserResult.user.uid,
                username: username.toLowerCase(),
                fullName,
                emailAddress: emailAddress.toLowerCase(),
                following: [],
                dateCreated: Date.now()
            });

            history.push(ROUTES.DASHBOARD);

            } catch (error) {
                setFullName('');
                setEmailAddress('');
                setPassword('');
                setError(error.message);          
            }
        } else {
            setError('That username is already taken.')
        }

        /*try {
 
        } catch (error) {

        }*/
    };

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        document.title - 'Sign Up - Co-Lab';
    }, []);

    return (
        <div className = "container flex mx-auto max-w-screen-lg items-center h-screen">
            <div className = 'flex w-3/5 mr-5'>
                <img src = '/images/co-lab login image.png' alt = 'iPhone with profile'></img>
            </div>
            <div className = 'flex flex-col w-2/5'>
                <div className = 'flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
                    <h1 className = 'flex justify-center w-full mb-5'>
                        <img src = '/images/co-lab login logo.png' alt = 'Co-Lab' className = 'mt-2 w-6/12'></img>
                    </h1>

                    {error && <p className = 'mb-4 text-xs test-red-primary'>{error}</p>}

                    <form onSubmit = { handleSignUp } method = 'POST'>
                        <input
                            aria-label = 'Enter your full name'
                            type = 'text'
                            placeholder = 'Full Name'
                            className = 'text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                            onChange = {({ target }) => setFullName(target.value)}
                            value = {fullName}
                        />
                        <input
                            aria-label = 'Enter your username'
                            type = 'text'
                            placeholder = 'Username'
                            className = 'text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                            onChange = {({ target }) => setUsername(target.value)}
                            value = {username}
                        />
                        <input
                            aria-label = 'Enter your email address'
                            type = 'text'
                            placeholder = 'Email Address'
                            className = 'text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                            onChange = {({ target }) => setEmailAddress(target.value)}
                            value = {emailAddress}
                        />
                        <input
                            aria-label = 'Enter your password'
                            type = 'password'
                            placeholder = 'Password'
                            className = 'text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                            onChange = {({ target }) => setPassword(target.value)}
                            value = {password}
                        />
                        <button
                            disabled = {isInvalid}
                            type = 'submit'
                            className = {`bg-orange-medium text-white w-full rounded h-8 font-bold
                                ${isInvalid && 'opacity-50'}`
                            }>
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className = 'flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded'>
                    <p className = 'text-sm'>Have an account? {``}
                        <Link to = {ROUTES.LOGIN} className = 'font-bold text-green-medium'>
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
};