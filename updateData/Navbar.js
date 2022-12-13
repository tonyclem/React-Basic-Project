import { Link } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch({
      type: 'LOGOUT',
    });
  };

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/categories');
        console.log('what is data', data);
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  console.log('categories', categories);

  return (
    <nav>
      <Link to='/'>
        <img src='/images/logo.png' width='50' alt='' />
      </Link>
      <div className='category-container'>
        <button className='category' onClick={handleOpen}>
          Category
        </button>
        {open ? (
          <div className='show-category'>
            {categories.map((category, index) => (
              <ul key={index}>
                <li>{category}</li>
              </ul>
            ))}
          </div>
        ) : null}
      </div>

      {state?.userInfo ? (
        <Link onClick={handleLogout} className='link' to={`/`}>
          Logout
        </Link>
      ) : (
        <Link className='link' to={`/login`}>
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
