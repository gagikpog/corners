import React, { useState } from 'react';
// import logo from './logo.svg';
// {/* <img src={logo} className="App-logo" alt="logo" /> */}
import './App.css';
import Board from './components/board';
import { Figures } from './components/figures';

export default function App() {

    return (
        <>
            <header></header>
            <main>
                <div className="game">
                    <Board />
                    <Figures />
                </div>
            </main>
        </>
    );
}
