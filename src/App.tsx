// import logo from './logo.svg';
// {/* <img src={logo} className="App-logo" alt="logo" /> */}
import { CSSProperties } from 'react';
import './App.css';
import Board from './components/board';
import { Figures } from './components/figures';
import { Header } from './components/header';
import { Messages } from './components/messages';
import { GAME_SIZE } from './constants';
import { Display } from './components/display';

export default function App() {

    return (
        <>
            <Header />
            <main>
                <div className="game" style={{ '--game-size': GAME_SIZE } as CSSProperties}>
                    <Board />
                    <Figures />
                </div>
                <Messages />
                <Display />
            </main>
        </>
    );
}
