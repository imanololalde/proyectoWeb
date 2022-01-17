import React from 'react'

export function GamesItem({game, toggleGame}) {
    const {id, location, dateGame, players ,completed} = game;

    const handleGameClick = () => {
        toggleGame(id);
    };

    return ( 
    <li> 
        <input type="checkbox" checked={completed} onChange={handleGameClick}/>
        {location}
        {dateGame}
        {players}
    </li>
    );
}
