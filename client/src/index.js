import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/style.css'
import { UserContextProvider } from './context/userContext';
import { BrowserRouter as Router } from 'react-router-dom';
// import AuthProvider from './components/AuthProvider';
// favicon
// import Favicon from './assets/DumbMerch.png';
// const favicon = document.getElementById('idFavicon');
// favicon.setAttribute('href', Favicon);

const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <UserContextProvider>
            <Router>
       <QueryClientProvider client={client}>
           <App />
       </QueryClientProvider>
          </Router>
     </UserContextProvider>
  </React.StrictMode>,
);




