import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


//auth stuff
import { Provider } from 'react-redux';
import store from './auth/store'
import './index.css';
// import App from './App';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//         <App />
//     </Provider>  
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <App />
// );


const root = ReactDOM.createRoot(document.getElementById('root'))
  
root.render(
  
    <Provider store={store}>
        <App />
    </Provider>  
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

