/* eslint-disable */

import '@babel/polyfill'
import { login } from './login';

document.querySelector('.form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  console.log(email, password)
  login(email, password);
});
