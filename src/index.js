import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from './context/userContext';
import { BrowserRouter } from 'react-router-dom';

const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider> 
    <QueryClientProvider client={client}>
        <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </React.StrictMode>
    </QueryClientProvider>
 </UserContextProvider>
);

