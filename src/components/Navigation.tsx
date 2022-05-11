import React, {useEffect} from "react";

interface userInfos {
    id: number,
    username: string,
    loggedIn: boolean,
}

export default function Navigation() {
    const [user, setUser] = React.useState<userInfos>({
        id: -1,
        username: "undefined (but not really)",
        loggedIn: false
    });

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
                return {
                    status: r.status,
                    response: r,
                }
            })
            .then(async r => {
                if (r.status === 200) {
                    let json: userInfos = await r.response.json();

                    return {
                        username: json.username,
                        id: json.id,
                        loggedIn: true,
                    } as userInfos;
                } else {
                    return {
                        username: "undefined",
                        id: -1,
                        loggedIn: false,
                    } as userInfos;
                }
            })
            .then(r => {
                console.log(r);
                setUser({
                    id: r.id,
                    username: r.username,
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
                    {!user.loggedIn ? (
                        <li>
                            <a href={`${process.env.REACT_APP_FETCH_CALL_DOMAIN}/auth/login`}>Login</a>
                        </li>
                    ) : (
                        <></>
                    )}
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