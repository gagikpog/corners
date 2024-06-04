// import logo from './logo.svg';
// {/* <img src={logo} className="App-logo" alt="logo" /> */}
import './App.css';
import Board from './components/board';
import { Figures } from './components/figures';
import { Header } from './components/header';
import { Messages } from './components/messages';

export default function App() {

    return (
        <>
            <Header />
            <main>
                <div className="game">
                    <Board />
                    <Figures />
                </div>
                <Messages />
            </main>
        </>
    );
}
