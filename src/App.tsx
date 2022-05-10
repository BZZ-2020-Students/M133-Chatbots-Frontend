import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [serverMessage, setServerMessage] = React.useState('');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_CALL_DOMAIN}/hello-world`, {
            method: 'GET',
        }).then(response => response.text())
            .then(data => {
                setServerMessage(data.toString());
            });
    });

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                Message from server: {serverMessage}
            </header>
        </div>
    );
}

export default App;
