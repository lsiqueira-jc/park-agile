import axios from 'axios';

function getAPIURL() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return 'http://192.168.15.11:3333/park-agile-6788e/us-central1';
    // return 'https://us-central1-oq20-139d9.cloudfunctions.net';
    // } else if (
    //   window.location.hostname === 'oqqrcodehom.firebaseapp.com' ||
    //   window.location.hostname === 'oqqrcodehom.web.app'
    // ) {
    //   return 'https://us-central1-appsemem.cloudfunctions.net';
  } else {
    return 'http://192.168.15.11:3333/park-agile-6788e/us-central1';
  }
}

export const api = axios.create({
  baseURL: getAPIURL(),
});
