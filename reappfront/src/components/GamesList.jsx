import React from 'react'
import { GamesItem } from './GamesItem'

export function GamesList({ games, toggleGame }) {
    return (
        <ul>
        {games.map((game)=>(
            <GamesItem key= {game.id} game={game} toggleGame = {toggleGame} />
        ))}
        </ul>
    );
}
