import React, {useState, useRef} from "react";
import {GamesList} from './components/GamesList';
import { v4 as uuidv4} from "uuid";
import { LoginButton } from "./components/Login";
import { LogoutButton } from "./components/Logout";
import { Profile } from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

export function App() {
    const {isAuthenticated} = useAuth0();


    const [games, setGames] = useState([]);

    const gamesLocationRef = useRef();
    const gamesDateGameRef = useRef();

    const toggleGame = (id) => { 
    const newGames = [...games];
    const game = newGames.find((game) => game.id == id);
    game.completed = !game.completed;
    setGames(newGames);
    };

    const handleGameAdd = () =>{
        const location = gamesLocationRef.current.value;
        const dateGame = gamesDateGameRef.current.value;
        const players = 0;
        if (location == '') return;

        setGames((prevGames) =>{
            return [ ...prevGames, {id:uuidv4(), location, dateGame, players:players+1, completed:false}]
        });

        gamesLocationRef.current.value = null;
    };

    const handleClearAll = () =>{
        const newGames = games.filter((game) => !game.completed);
        setGames(newGames); 
    }

    return (
    <React.Fragment>
        <GamesList games={games} toggleGame={toggleGame}/>
        <input ref={gamesLocationRef} type="text" placeholder="Location"></input>
        <input ref={gamesDateGameRef} type="date"></input>
        <button onClick={handleGameAdd}>➕</button>
        <button onClick={handleClearAll}>🗑️</button>
        <div>Hay {games.filter((game) => !game.completed).length} partidos disponibles</div>
        {isAuthenticated ? <>
            <LogoutButton/>
            <Profile/>
            </>
            :<LoginButton/>
        }
        
    </React.Fragment>
    );
}