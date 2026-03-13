import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './Context/AppContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </QueryClientProvider>
    </BrowserRouter>
)