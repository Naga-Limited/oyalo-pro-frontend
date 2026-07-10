import React, {useState, useEffect} from 'react';
import {LoggingOff} from './LoggingOff';

const NoInternetConnections = (props) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  window.addEventListener('online', () => {
    setOnline(true);
    window.location.reload();
  });

  window.addEventListener('offline', () => {
    setOnline(false);
  });

  // if user is online, return the child component else return a custom component
  if (isOnline) {
    return props.children;
  } else {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column-reverse',
          paddingTop: '40px'
        }}>
        <div style={{fontSize: '30px', paddingTop: '10px', color: 'red', fontFamily: 'cursive'}}>Please check your Internet Connection........</div>
        <LoggingOff />
      </div>
    );
  }
};

export default NoInternetConnections;
