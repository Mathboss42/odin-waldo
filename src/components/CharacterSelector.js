function CharacterSelector({ x, y, cellX, cellY, onClickClose, onClickCharacter, charactersFound }) {
    return (
        <div id="character-selector" style={{top: y, left: x}}>
            <div className="characters">
                {charactersFound.includes('zoidberg') ? null : <p onClick={() => {onClickCharacter(cellX, cellY, 'zoidberg'); onClickClose();}}>Zoidberg</p>}
                {charactersFound.includes('jabba') ? null : <p onClick={() => {onClickCharacter(cellX, cellY, 'jabba'); onClickClose();}}>Jabba The Hutt</p>}
                {charactersFound.includes('wilson') ? null : <p onClick={() => {onClickCharacter(cellX, cellY, 'wilson'); onClickClose();}}>Wilson</p>}
            </div>
            <div>
                <button onClick={onClickClose}>X</button>
            </div>
        </div>
    );
}

export default CharacterSelector;