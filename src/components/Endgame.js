import { useNavigate, useLocation } from "react-router-dom";

function Endgame() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div id="Endgame" className="menu">
            <p>Congrats! You found all the characters in {location.state.time} seconds!</p>
            <button onClick={() => navigate('/', {state: {isGameRunning: true}})}>Play Again</button>
        </div>
    );
}

export default Endgame;