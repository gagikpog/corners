import './App.css';
import { Header } from './components/header';
import { Messages } from './components/messages';
import { Display } from './components/display';
import { Provider } from './context';
import { Settings } from './components/settings';
import { Game } from './components/game';
import { Bot } from './components/bot';

export default function App() {

    return (
        <Provider>
            <>
                <Header />
                <main className='cg-main'>
                    <Settings/>
                    <Game />
                    <Messages />
                    <Display />
                    <Bot />
                </main>
            </>
        </Provider>
    );
}
