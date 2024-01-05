import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchableTable from '../Search/SearchPage';

// interface HomeProps {
//     setLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
// }
// const Home: React.FC<HomeProps> = ({ setLoggedIn }) => {
const Home: React.FC = () => {
    const navigate = useNavigate();
  useEffect(() => {
    const loggedIn =  localStorage.getItem('isLoggedIn') === 'true'
    console.log('what does localstorage have? ', localStorage.getItem('isLoggedIn'))
    !loggedIn ? navigate('/login') : null
  }, []);

  const Logout = async() => {
    try {
        const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', { withCredentials: true });
        console.log('API response:', response.data);
        // setLoggedIn(false)
        localStorage.removeItem('isLoggedIn');
        navigate('/login')
      } catch (error) {
        console.error('API request failed!', error);
      }
  }

  return (
    <div style={{display: 'flex', textAlign: 'center'}}>
      <div className="home_page" style={{color: 'white'}}>
        {/* <h4>
          {" "}
          Welcome <span>{}</span>
        </h4> */}
        <SearchableTable loggedIn={localStorage.getItem('isLoggedIn') == 'true'}/>
        <button onClick={Logout}>Logout</button>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Home;