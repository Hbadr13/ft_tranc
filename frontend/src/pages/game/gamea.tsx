import React, { useEffect, useRef, useState, RefObject } from "react";
import { startGame } from "../../utils/main";
import { Player, Canvas, Ball, GameInfo } from "../../utils/class";
import { InfoGameFromClientProps } from "@/components/model";
import { Socket } from "socket.io";
import { io } from "socket.io-client";
import Link from "next/link";
import { useRouter } from "next/router";
// import { DefaultEventsMap } from 'socket.io';

interface InfoGame {
    infoGameFromClient: InfoGameFromClientProps;
}
let computer = new Player(0, 0);
let player = new Player(GameInfo.PLAYER_X, GameInfo.PLAYER_Y);
GameInfo.VELOCIT *= 12;
GameInfo.SPEED *= 12;
let ball = new Ball(200, 50, "red", 10, GameInfo.VELOCIT, GameInfo.VELOCIT);
let mousePosition = { x: 0, y: 0 };
let HoAreYou = 0
const Pong = (props: InfoGame) => {
    const myCanvasRef = useRef<HTMLCanvasElement>(null);
    const [room, setroom] = useState("");
    const [socket, setsocket] = useState<any>();
    const [numberPlayer, setnumberPlayer] = useState(0);
    const [computerScore, setcomputerScore] = useState(0);
    const [playerScore, setplayerScore] = useState(0);
    const [indexx, setindexx] = useState(0);
    const [gameStatus, setgameStatus] = useState('Pause')
    const router = useRouter();

    useEffect(() => {
        socket?.on("start", () => {
            setnumberPlayer(2);
            setInterval(() => {
                startGame(myCanvasRef, mousePosition, ball, player, computer, props.infoGameFromClient, HoAreYou);
                setcomputerScore(computer.score);
                setplayerScore(player.score);
                if (HoAreYou == 0) {
                    if (ball.x < 0) {
                        computer.score += 1;
                        ball.x = GameInfo.CANVAS_WIDTH / 2;
                        ball.y = GameInfo.CANVAS_HIEGHT / 2;
                        ball.velocityX = GameInfo.VELOCIT;
                        ball.velocityY = GameInfo.VELOCIT;
                    }
                    if (ball.x > GameInfo.CANVAS_WIDTH) {
                        player.score += 1;
                        ball.x = GameInfo.CANVAS_WIDTH / 2;
                        ball.y = GameInfo.CANVAS_HIEGHT / 2;
                        ball.velocityX = GameInfo.VELOCIT;
                        ball.velocityY = GameInfo.VELOCIT;
                    }
                }
                if (props.infoGameFromClient.selectPlayer == "online") {
                    if (HoAreYou == 0) {
                        socket?.emit("update1", player.y);
                    }

                    if (HoAreYou == 1) {
                        socket?.emit("update2", computer.y);
                    }
                    if (HoAreYou == 0)
                        socket?.emit("moveBall", {
                            x: ball.x,
                            y: ball.y,
                            playerScore: player.score,
                            computerScore: computer.score,
                            statuee: gameStatus
                        });
                    socket?.on("y1", (yy: number) => {
                        if (HoAreYou == 1) mousePosition.y = yy;
                    });
                    socket?.on("y2", (yy: number) => {
                        if (HoAreYou == 0) mousePosition.x = yy;
                    });
                    socket?.on("movebb", (obj: any) => {
                        if (HoAreYou == 1) {
                            ball.x = obj.x;
                            ball.y = obj.y;
                            computer.score = obj.computerScore;
                            player.score = obj.playerScore;
                        }
                    });
                }
            }, 1000 / 60);
        });
    });
    const handleMouseMove = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        if (HoAreYou == 0) mousePosition.y = e.clientY - rect.top - 25;
        if (HoAreYou == 1) mousePosition.x = e.clientY - rect.top - 25;
    };
    useEffect(() => {
        const handlerResize = () => {
            const canvas = myCanvasRef.current;
            if (!canvas) return;
            // canvas.width = window.innerWidth < 2000 ? window.innerWidth - window.innerWidth / 2 : 1000
            // computer.x = window.innerWidth < 2000 ? window.innerWidth - window.innerWidth / 2 : 1000
            // canvas.width = 400
            computer.x = canvas.width;
            computer.x -= 10;
        };
        handlerResize();
        window.addEventListener("resize", handlerResize);
    });
    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            const keyPressed = event.key;
            if (keyPressed === "a") {
                mousePosition.y += 5;
            }
            if (keyPressed === "w") {
                mousePosition.y -= 5;
            }
            if (keyPressed === "ArrowDown") {
                mousePosition.x += 5;
            }
            if (keyPressed === "ArrowUp") {
                mousePosition.x -= 5;
            }
        });
    });
    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        setsocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);
    useEffect(() => {
        socket?.on("indexPlayer", (yy: number) => {
            HoAreYou = yy;
        });
    });
    if (
        props.infoGameFromClient.selectPlayer === "computer" ||
        props.infoGameFromClient.selectPlayer === "offline"
    ) {
        socket?.emit("startWithComputer", room);
    }

    const sendMessage = () => {
        setnumberPlayer(1);
        socket?.emit("joinRoom", room);
    };


    useEffect(() => {
        socket?.on("indexx", (ind: string) => {
            setgameStatus(ind)
            player.status = ind
            computer.status = ind
        })
    })

    const handelButtonGameStatus = () => {
        const status = gameStatus === 'Pause' ? 'Resume' : 'Pause'
        socket?.emit('indexx', status)
        computer.status = status
        player.status = status
        setgameStatus(status)
    }
    // useEffect(()=>{
    //     socket?.on("")
    // })
    useEffect(() => {
        socket?.on("leaveRoom", (ind: any) => {
            console.log('leaveRoom:')
            handelButtonLeave()
        })
    })
    const handelButtonLeave = () => {
        // location.reload()
        router.push('/game?h=1');
        // location.
    }
    return (
        <>
            <div className="w-full h-[600px] flex justify-center items-center mt-20">
                {numberPlayer == 0 &&
                    props.infoGameFromClient.selectPlayer === "online" ? (
                    <div>
                        <input
                            type="text"
                            value={room}
                            onChange={(e) => setroom(e.target.value)}
                        />
                        <button onClick={sendMessage}>join room</button>
                    </div>
                ) : null}
                {numberPlayer == 1 &&
                    props.infoGameFromClient.selectPlayer === "online" ? (
                    <div>waiting for oponenet</div>
                ) : null}
                {numberPlayer == 2 ||
                    props.infoGameFromClient.selectPlayer === "computer" ||
                    props.infoGameFromClient.selectPlayer === "offline" ? (
                    <div className="w-full h-[100%] flex items-center flex-col space-y-10">
                        <div>{ }</div>
                        <canvas
                            className="bg-black rounded-2xl h-[70%] w-[70%] "
                            onMouseMove={handleMouseMove}
                            ref={myCanvasRef}
                            height={400}
                            width={1000}
                        >
                        </canvas>
                        <div className="w-[400px] h-[70px] rounded-2xl flex justify-around items-center">
                            <div className="bg-slate-400 w-[20%] h-[90%] rounded-2xl flex justify-center items-center text-3xl">
                                {playerScore}
                            </div>

                            <button onClick={handelButtonGameStatus} className="bg-slate-400 w-[20%] h-[90%] rounded-2xl flex justify-center items-center text-3xl">
                                {gameStatus}
                            </button>

                            <div className="bg-slate-400 w-[20%] h-[90%] rounded-2xl flex justify-center items-center text-3xl">
                                {computerScore}
                            </div>
                            <button onClick={handelButtonLeave} className="bg-slate-400 w-[20%] h-[90%] rounded-2xl flex justify-center items-center text-3xl">
                                Leave
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
            <button onClick={handelButtonLeave} className="bg-red-400 w-[20%] h-[90%] rounded-2xl flex justify-center items-center text-3xl">
                Leave
            </button>
        </>
    );
};

export default Pong;
