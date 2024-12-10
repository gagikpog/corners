import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { isLocalHost } from './helpers/isLocalHost';
import { initYM } from './helpers/ym';

const root = ReactDOM.createRoot(
    document.getElementById('cg-root') as HTMLElement
);

root.render(<App />);


if (!isLocalHost()) {
    initYM();
}
