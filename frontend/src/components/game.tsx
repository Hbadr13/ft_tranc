import React, { useEffect, useRef, useState, RefObject } from "react";
import { startGame } from "../utils/main";
import { Player, Ball, GameInfo } from "../utils/class";
import { InfoGameFromClientProps } from "@/components/model";
import { io } from "socket.io-client";
import { useRouter } from "next/router";

interface InfoGameprops {
    infoGameFromClient: InfoGameFromClientProps;
    selectPlayer: string
    setselectPlayer: (selectPlayer: string) => void
}
let computer = new Player(0, 0);
let player = new Player(GameInfo.PLAYER_X, GameInfo.PLAYER_Y);
// GameInfo.VELOCIT *= 0.8;
// GameInfo.SPEED *= 0.8;
let ball = new Ball(200, 50, "red", 10, GameInfo.VELOCIT, GameInfo.VELOCIT, GameInfo.SPEED);
let mousePosition = { x: 0, y: 0 };
let HoAreYou = 0
const Pong = ({ infoGameFromClient, selectPlayer, setselectPlayer }: InfoGameprops) => {

    const myCanvasRef = useRef<HTMLCanvasElement>(null);
    const [room, setroom] = useState("");
    const [socket, setsocket] = useState<any>();
    const [numberPlayer, setnumberPlayer] = useState(0);
    const [computerScore, setcomputerScore] = useState(0);
    const [playerScore, setplayerScore] = useState(0);
    const [gamaIsStart, setgamaIsStart] = useState(0)
    const [YouWon, setYouWon] = useState(0);
    const [gameStatus, setgameStatus] = useState('Pause')
    const router = useRouter();

    useEffect(() => {

        socket?.on("start", () => {
            if (infoGameFromClient.selectPlayer === 'online') {
                GameInfo.SPEED = 2;
                GameInfo.VELOCIT = 1;
                GameInfo.ACCELERATION = 0.2;

                ball.speed = GameInfo.SPEED
                ball.velocityX = GameInfo.VELOCIT;
                ball.velocityY = GameInfo.VELOCIT;
            }
            setnumberPlayer(2);
            setgamaIsStart(1)

            setInterval(() => {
                if (HoAreYou == 1) {
                    if (document.hidden)
                        socket?.emit("documentHidden")
                }
                // if (document.hidden)
                //     socket?.emit("document-hidden")

                const now = new Date();
                const hours = now.getHours();
                const minutes = now.getMinutes();
                const seconds = now.getSeconds();

                startGame(myCanvasRef, mousePosition, ball, player, computer, infoGameFromClient, HoAreYou);
                setcomputerScore(computer.score);
                setplayerScore(player.score);
                if (HoAreYou == 0) {
                    if (ball.x < 0) {
                        computer.score += 1;
                        ball.x = GameInfo.CANVAS_WIDTH / 2;
                        ball.y = GameInfo.CANVAS_HIEGHT / 2;
                        ball.velocityX = GameInfo.VELOCIT;
                        ball.velocityY = GameInfo.VELOCIT;
                        ball.speed = GameInfo.SPEED

                    }
                    if (ball.x > GameInfo.CANVAS_WIDTH) {
                        player.score += 1;
                        ball.x = GameInfo.CANVAS_WIDTH / 2;
                        ball.y = GameInfo.CANVAS_HIEGHT / 2;
                        ball.velocityX = GameInfo.VELOCIT;
                        ball.velocityY = GameInfo.VELOCIT;
                        ball.speed = GameInfo.SPEED
                    }
                }
                if (infoGameFromClient.selectPlayer == "online") {
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
                }
            }, 1000 / 60);
        });
    });

    useEffect(() => {
        const handlerResize = () => {
            const canvas = myCanvasRef.current;
            if (!canvas) return;
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
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000";
        const newSocket = io(socketUrl);
        setsocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        socket?.on("indexPlayer", (index: number) => {
            HoAreYou = index;
        });

        socket?.on("ResumePause", (value: string) => {
            console.log(value)
            setgameStatus(value)
            player.status = value
            computer.status = value
        })
        socket?.on("leaveRoom", () => {
            console.log('leaveRoom:')
            player.status = 'Pause'
            computer.status = 'Pause'
            setYouWon(1)
        })
        socket?.on("posY", (posY: number) => {
            if (HoAreYou == 1)
                mousePosition.y = posY;
        });
        socket?.on("posX", (posX: number) => {
            if (HoAreYou == 0)
                mousePosition.x = posX;
        });
        socket?.on("movebb", (obj: any) => {
            if (HoAreYou == 1) {
                ball.x = obj.x;
                ball.y = obj.y;
                computer.score = obj.computerScore;
                player.score = obj.playerScore;
            }
        });
        socket?.on("documentHidden", (flag: boolean) => {
            // if(flag)
            const value = "Resume"
            console.log("--->:", value)
            setgameStatus(value)
            player.status = value
            computer.status = value
        })
    })

    if (infoGameFromClient.selectPlayer === "computer" ||
        infoGameFromClient.selectPlayer === "offline") {
        socket?.emit("startWithComputer", room);
    }

    const handleMouseMove = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        if (HoAreYou == 0) mousePosition.y = e.clientY - rect.top - 25;
        if (HoAreYou == 1) mousePosition.x = e.clientY - rect.top - 25;
    };
    const sendMessage = () => {
        setnumberPlayer(1);
        socket?.emit("joinRoom", room);

    };
    const handelButtonGameStatus = () => {
        const status = gameStatus === 'Pause' ? 'Resume' : 'Pause'
        socket?.emit('ResumePause', status)
        computer.status = status
        player.status = status
        setgameStatus(status)
    }
    const handelButtonLeave = () => {
        setselectPlayer('')
        router.push('/game?h=1');
    }
    return (
        <>
            <div className="w-full h-[600px] flex justify-center items-center mt-20">
                {numberPlayer == 0 &&
                    infoGameFromClient.selectPlayer === "online" ? (
                    <div>
                        <button className="bg-red-400 w-[80px] h-[90px] rounded-2xl text-3xl mx-2" onClick={sendMessage}>join room</button>
                    </div>
                ) : null}
                {numberPlayer == 1 &&
                    infoGameFromClient.selectPlayer === "online" ? (
                    <div className="bg-red-400  h-[90px] pt-5  rounded-2xl text-3xl px-1 mx-2">waiting for oponenet</div>
                ) : null}
                {numberPlayer == 2 ||
                    infoGameFromClient.selectPlayer === "computer" ||
                    infoGameFromClient.selectPlayer === "offline" ? (
                    <div className="w-full h-[100%] flex items-center flex-col space-y-10">
                        <div>{ }</div>
                        <canvas
                            className={`bg-black rounded-2xl h-[70%] w-[50%] ${false ? 'hidden' : ''}`}
                            onMouseMove={handleMouseMove}
                            ref={myCanvasRef}
                            height={400}
                            width={800}
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

                {
                    (gamaIsStart == 0) ?
                        (<button onClick={handelButtonLeave} className="bg-red-400 w-[20%] h-[90px] rounded-2xl flex justify-center items-center text-3xl">
                            previous
                        </button>) : null
                }
                {

                    YouWon ? (<div className="w-[40%] h-[40%] bg-yellow-600  rounded-3xl  absolute flex items-center justify-center">
                        <span className="text-3xl">You Won</span>
                    </div>) : null
                }
            </div>

        </>
    );
};

export default Pong;
