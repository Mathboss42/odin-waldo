import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config.js';
import { getFireStore, collection, getDocs } from 'firebase/firestore/lite'
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from 'react';

const app = initializeApp(getFirebaseConfig());
// const db = getFireStore(app);
const storage = getStorage(app);
const pathReference = ref(storage, 'bg01.png');

function App() {
    const [bgImg, setBgImg] = useState('');

    useEffect(() => {
        getDownloadURL(pathReference).then((url) => {
            setBgImg(url);
        });
    }, [])

    return (
        <div className="App">
            {}
            <img src={bgImg} alt="background" />
        </div>
    );
}

export default App;
