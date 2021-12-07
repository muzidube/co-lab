import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  const guestLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInAnonymously();
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    document.title - 'Login - Co-Lab';
  }, []);

  return (
    <div className="container flex flex-col mx-auto max-w-screen-lg items-center h-screen justify-center">
      <div className="flex w-300px md:w-2/5 mb-10">
        <img
          className="mx-auto w-300px md:w-500px"
          src="/images/co-lab login image.png"
          alt="iPhone with profile"
        ></img>
      </div>
      <div className="flex flex-col w-4/5 md:w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full mb-4">
            <img src="/images/co-lab logo.png" alt="Co-Lab" className="mt-2 w-6/12"></img>
          </h1>

          {error && <p className="mb-4 text-xs test-red-primary">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email Address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-orange-medium text-white w-full rounded h-8 font-bold mb-3
                                ${isInvalid && 'opacity-50'}`}
            >
              Login
            </button>
            <button
              type="submit"
              className="bg-green-medium text-white w-full rounded h-8 font-bold"
              onClick={guestLogin}
            >
              Try As Guest
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Don't have an account? {``}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-green-medium ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
