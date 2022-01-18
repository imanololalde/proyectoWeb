import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const Profile = () => {
    const { user, isAuthenticated, isLoading} = useAuth0();

    if (isLoading){
        return <div>Loading...</div>
    }

    return (
        isAuthenticated && (
            <div  style={{ padding :'10px 20px', textAlign:'center'}} >
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
            </div>
        )
    )
}