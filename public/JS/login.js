/* eslint-disable */
import axios from 'axios';

export const login = async (email, password) => {
  console.log('first');
  try {
    const res = await fetch(
      'http://127.0.0.1:3000/api/v1/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    console.log(res);

    if (res.data.status === 'success') {
      alert('Logged in successfully!');
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
  }
};
