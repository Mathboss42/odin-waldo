import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config.js';
import { getFireStore, collection, getDocs } from 'firebase/firestore/lite'
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from 'react';

const GRIDX = 107;
const GRIDY = 200;

const app = initializeApp(getFirebaseConfig());
// const db = getFireStore(app);
const storage = getStorage(app);
const pathReference = ref(storage, 'bg01.png');

function generateGrid(length, height) {
    const arr = [];

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < length; j++) {
            arr.push([j+1, i+1]);
        }
    }

    return arr.map((el, index) => {
        return <div className='grid-cell' data-x={el[0]} data-y={el[1]} key={index}></div>
    })
}

function App() {
    const [bgImg, setBgImg] = useState('');

    useEffect(() => {
        getDownloadURL(pathReference).then((url) => {
            setBgImg(url);
        });
    }, [])

    return (
        <div className="App">
            <div className="grid-container">
                {generateGrid(GRIDX, GRIDY)}
                <img src={bgImg} alt="background" />
            </div>
        </div>
    );
}

export default App;
