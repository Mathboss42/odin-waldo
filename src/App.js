import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config.js';
import { getFirestore, getDocs, collection, query} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useRef, useState } from 'react';
import CharacterSelector from './components/CharacterSelector';

const GRIDX = 50;
const GRIDY = 100;

const app = initializeApp(getFirebaseConfig());

const db = getFirestore(app);

const storage = getStorage(app);
const pathReference = ref(storage, 'bg01.png');



function App() {
    const [bgImg, setBgImg] = useState('');
    const [isSelectorDisplayed, setIsSelectorDisplayed] = useState(false);
    const [selectorCoords, setSelectorCoords] = useState([0, 0]);
    const [lastClickCoords, setLastClickCoords] = useState([0, 0]);
    const [charactersFound, setcharactersFound] = useState([]);
    const [time, setTime] = useState(0);
    const [charactersLeft, setCharactersLeft] = useState(['zoidberg', 'jabba', 'wilson']);
    
    const canClick = useRef(true);
    
    useEffect(() => {
        getDownloadURL(pathReference).then((url) => {
            setBgImg(url);
        });

        // const setSticky = () => {
        //     window.onscroll = function() {switchSticky()};
        //     const header = document.querySelector(".header");
        //     const sticky = header.offsetTop;

        //     function switchSticky() {
        //         if (window.pageYOffset > sticky) {
        //             header.classList.add("sticky");
        //         } else {
        //             header.classList.remove("sticky");
        //         }
        //     }
        // }

        // setSticky();
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {setTime(time + 1)}, 1000);

        return () => {
            clearInterval(interval);
        }
    })

    useEffect(() => {
        if (charactersFound.length === 3) {
            alert('You Won!');
            canClick.current = false;
        }
    }, [charactersFound])

    const fetchCoords = async (character) => {
        const q = query(collection(db, character));
        const querySnapshot = await getDocs(q);
        const corners = [];
        querySnapshot.forEach((doc) => {
            corners.push({id: doc.id, coords:doc.data()});
        })
        return corners.sort();
    }

    const generateGrid = (length, height) => {
        const arr = [];

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < length; j++) {
                arr.push([j+1, i+1]);
            }
        }
    
        return arr.map((el, index) => {
            return <div
                    className='grid-cell'
                    data-x={el[0]}
                    data-y={el[1]}
                    key={index}
                    onClick={onCellClick}
                    >
                    </div>
        })
    }

    const onCellClick = (event) => {
        if (!canClick.current) return;
        //display character selection menu at cursor position
        const displayX = event.clientX + document.documentElement.scrollLeft;
        const displayY = event.clientY + document.documentElement.scrollTop;
        
        setIsSelectorDisplayed(true);
        setSelectorCoords([displayX, displayY]);

        const cellX = event.target.dataset.x;
        const cellY = event.target.dataset.y;

        setLastClickCoords([cellX, cellY]);
    }

    const onCloseSelector = () => {
        setIsSelectorDisplayed(false);
    }

    const onSelectCharacter = async (cellX, cellY, character) => {
        canClick.current = false;
        const corners = await fetchCoords(character);

        if (checkCoords(cellX, cellY, corners)) {
            setcharactersFound([...charactersFound, character]);
            setCharactersLeft(charactersLeft.filter(el => el !== character));
            console.log('success!');
        } else {
            console.log('fail');
        }

        canClick.current = true;
    }

    const checkCoords = (x, y, corners) => {
        return x >= corners[0].coords.x
                && x <= corners[1].coords.x
                && y >= corners[3].coords.y
                && y <= corners[0].coords.y
    }

    return (
        <div className="App">
            <div className="header">
                <div className='header-sub'>
                    <h1>Where's [INSERT POP CHARACTER]?</h1>
                    <p>{`Total Time: ${time}s`}</p>
                </div>
                <div className='header-sub'>
                    <h3>Characters left to find:</h3>
                    <ul>
                        {charactersLeft.map((el, index) => {
                            return <li key={index}>{el[0].toUpperCase() + el.slice(1, el.length)}</li>
                        })}
                    </ul>
                </div>
            </div>
            {isSelectorDisplayed
                ? <CharacterSelector 
                    x={selectorCoords[0]} 
                    y={selectorCoords[1]} 
                    cellX={lastClickCoords[0]}
                    cellY={lastClickCoords[1]}
                    onClickClose={onCloseSelector}
                    onClickCharacter={onSelectCharacter}
                    charactersFound={charactersFound}
                    />
                : null
            }
            <div className="grid-container">
                {generateGrid(GRIDX, GRIDY)}
                <img src={bgImg} alt="background" />
            </div>
        </div>
    );
}

export default App;
