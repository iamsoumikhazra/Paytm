import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Pay() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/sign-in');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user', {
          headers: {
            Authorization: token,
          },
        });
        const { firstName, lastName, email } = response.data;
        setUserData({ firstName, lastName, email });
        setIsAuthenticated(true);
      } catch (error) {
        console.error(`Error fetching user data: ${error}`);
        navigate('/sign-in');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      {isAuthenticated ? `Hello ${userData.firstName}` : 'You need to sign in to access this page.'}
    </div>
  );
}

export default Pay;
