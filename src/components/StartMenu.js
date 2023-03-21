function StartMenu({ onClickStart }) {
    return (
        <div id="StartMenu" className="menu">
            <button onClick={onClickStart}>Start</button>
        </div>
    );
}

export default StartMenu;