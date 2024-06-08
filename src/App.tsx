import { CSSProperties } from 'react';
import './App.css';
import Board from './components/board';
import { Figures } from './components/figures';
import { Header } from './components/header';
import { Messages } from './components/messages';
import { GAME_SIZE } from './constants';
import { Display } from './components/display';
import { Provider } from './context';

export default function App() {

    return (
        <Provider>
            <>
                <Header />
                <main className='cg-main'>
                    <div className="cg-game" style={{ '--game-size': GAME_SIZE } as CSSProperties}>
                        <Board />
                        <Figures />
                    </div>
                    <Messages />
                    <Display />
                </main>
            </>
        </Provider>
    );
}
