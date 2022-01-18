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
        const play = 0;
        if (location == '') return;

        setGames((prevGames) =>{
            return [ ...prevGames, {id:uuidv4(), location, dateGame, players:play+1, completed:false}]
        });

        gamesLocationRef.current.value = null;
    };

    const handleClearAll = () =>{
        const newGames = games.filter((game) => !game.completed);
        setGames(newGames); 
    }

    const handleMorePlayers = (id) => { 
        const newGames = [...games];
        const game = newGames.find((game) => game.id == id);
        game.players = game.players+1;
        setGames(newGames);
    };

    const handleLessPlayers = (id) => { 
        const newGames = [...games];
        const game = newGames.find((game) => game.id == id);
        game.players = game.players-1;
        setGames(newGames);
    };

    return (
    <React.Fragment >
        <body >
        <h1 style={{ padding:'10px 20px', textAlign:'center', color: 'black'}}>App Futbol</h1>
    <div style={{ backgroundColor : 'lightblue', width: '300px', minHeight: '200px', boxSizing : 'border-box', margin :'30px auto'}}>
        {isAuthenticated ? <>
        <GamesList games={games} toggleGame={toggleGame}/>
        <input ref={gamesLocationRef} type="text" placeholder="Location"></input>
        <input ref={gamesDateGameRef} type="date"></input>
        <button onClick={handleGameAdd}>➕</button>
        <button onClick={handleClearAll}>🗑️</button>
        <div>Hay {games.length} partidos disponibles</div>
        <button onClick={handleMorePlayers}>Mas 1 jugador</button>
        <button onClick={handleLessPlayers}>Menos 1 jugador</button>
        <br/>
            <LogoutButton/>
            <Profile/>
            </>
            :<LoginButton/>
        }
    </div>
    </body>
    </React.Fragment>
    );
}