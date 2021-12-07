import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import FirebaseContext from '../context/firebase';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/timeline';
import GuestTimeline from '../components/guest-timeline';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';
import { LOGIN } from '../constants/routes';

export default function Dashboard({ user: loggedInUser }) {
  const { user } = useUser(loggedInUser.uid);
  const { firebase } = useContext(FirebaseContext);
  const isUser = firebase.auth().currentUser || '';
  const history = useHistory();
  const noUser = () => {
    firebase.auth().signOut();
    history.push(LOGIN);
  };

  useEffect(() => {
    document.title = 'Co-Lab';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      {isUser ? (
        isUser.isAnonymous ? (
          <div className="bg-gray-background">
            <Header anon={true} />
            <div className="grid mx-auto w-full md:w-675.333px">
              <GuestTimeline />
            </div>
          </div>
        ) : (
          <div className="bg-gray-background">
            <Header anon={false} />
            <div className="grid md:grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
              <Timeline />
              <Sidebar />
            </div>
          </div>
        )
      ) : (
        noUser()
      )}
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};
