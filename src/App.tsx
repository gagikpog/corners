// import logo from './logo.svg';
// {/* <img src={logo} className="App-logo" alt="logo" /> */}
import './App.css';
import Board from './components/board';
import { Figures } from './components/figures';
import { Header } from './components/header';

export default function App() {

    return (
        <>
            <Header />
            <main>
                <div className="game">
                    <Board />
                    <Figures />
                </div>
            </main>
        </>
    );
}
