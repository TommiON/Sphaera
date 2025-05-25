import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { LoginData } from '../types/LoginData';
import { login } from '../services/AuthenticationServices';
import { LoggedUserData } from '../types/LoggedUserData';

const LoginScreen = ({loginCallback}: {loginCallback: Function}) => {
    const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });

    const handleLoginFieldChange = (event: any) => {
        event.preventDefault();
        const field = event.target.name;
        const value = event.target.value;
        setLoginData({ ...loginData, [field]: value });
    }

    const handleLoginSubmit = (event: any) => {
        event.preventDefault();
        login(loginData)
            .then(response => {
                console.log('*** login response:', response)
                const user: LoggedUserData = {
                    username: response.data.username,
                    clubid: response.data.clubid,
                    token: response.data.token
                }
                loginCallback(user);
            })
            .catch(error => 
                console.log('Login-virhe:', error));
    }

    return(
        <div>
            <h3>Kirjaudu sisään</h3>
            <Form onSubmit={handleLoginSubmit}>
                <Form.Group>
                    <Form.Control   type='text'
                                    placeholder='Käyttäjätunnus'
                                    name='username'
                                    value={loginData?.username}
                                    onChange={handleLoginFieldChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control   type='password'
                                    placeholder='salasana'
                                    name='password'
                                    value={loginData?.password}
                                    onChange={handleLoginFieldChange}/>
                </Form.Group>
                <Button variant='primary' type='submit'>Kirjaudu</Button>
            </Form>

            <h3>...tai luo käyttäjätunnus</h3>
            <Form>
                <Form.Group>
                    <Form.Control type='text' placeholder='Käyttäjätunnus, vähintään 5 merkkiä'/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type='text' placeholder='Seuran nimi, vähintään 4 merkkiä'/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type='password' placeholder='Salasana'/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type='password' placeholder='Salasana uudelleen'/>
                </Form.Group>
                <Button variant='primary' type='submit'>Lisää</Button>
            </Form>
        </div>
        
    )
}

export default LoginScreen;