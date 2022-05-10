import React, {useEffect} from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Navigation from "./components/Navigation";

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
        <HashRouter>
            <div className="App">
                <Navigation/>
                Message from server: {serverMessage}
            </div>
        </HashRouter>
    );
}

export default App;
