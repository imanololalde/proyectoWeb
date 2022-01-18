import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
    const {loginWithRedirect } = useAuth0();

    return <button  style={{ padding :'10px 20px', margin :'0', position: 'absolute', top:'21%', left:'48%', buttonAlign:'center'}} onClick={() => loginWithRedirect()}>Login</button>

}
