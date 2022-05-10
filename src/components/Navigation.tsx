import React, {useEffect} from "react";

interface userInfos {
    id: number,
    username: string,
    loggedIn: boolean,
}

export default function Navigation() {
    const [user, setUser] = React.useState<userInfos>({id: -1, username: "undefined", loggedIn: false});

    // checks if the user is logged in
    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_CALL_DOMAIN}/auth/auth-check`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(r => {
                if (r.status === 200) {
                    return {user: r.json(), loggedIn: true};
                } else if (r.status === 201) {
                    return {user: {
                        username: "undefined",
                        id: -1,
                        loggedIn: false,
                    } as userInfos, loggedIn: false};
                }
            })
            .then(r => {
                console.log(r);
                setUser({
                    id: r.user.id,
                    username: r.user.username,
                    loggedIn: r.loggedIn,
                });
            });
    }, []);

    return (
        <>
            <nav className="navigation">
                <h1>Chatbots!</h1>
                <ul>
                    <li>
                        <p>da chunt no en Link ane</p>
                    </li>
                </ul>
            </nav>
            <div className={"user-info"}>
                <p>{user.username}</p>
                <p>{user.id}</p>
                <p>{user.loggedIn}</p>
            </div>
        </>
    );
}