import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export const useUsername = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const { pathname } = useLocation();

  useEffect(() => {
    const currName = localStorage.getItem('username');

    if (currName !== username) {
      setUsername(currName);
    }
  }, [username, pathname]);

  return username;
};
