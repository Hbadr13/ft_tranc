import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const OnlineUsersComponent = () => {
    const [socket, setSocket] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // useEffect(() => {
    //     const newSocket = io('http://localhost:8003'); // Adjust the URL if needed
    //     setSocket(newSocket);

    //     newSocket.on('updateOnlineUsers', (users) => {
    //         setOnlineUsers(users);
    //     });

    //     return () => {
    //         newSocket.disconnect();
    //     };
    // }, []);

    return (
        <div>
            <h1>Online Users</h1>
            <ul>
                {onlineUsers.map((user) => (
                    <li key={user}>{user}</li>
                ))}
            </ul>
        </div>
    );
};

export default OnlineUsersComponent;
