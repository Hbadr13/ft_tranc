import React, { useEffect, useRef, useState, RefObject } from "react";
import { startGame } from "../../utils/main";
import { Player, Ball, GameInfo } from "../../utils/class";
import { InfoGameFromClientProps } from "@/components/model";
import { io } from "socket.io-client";
import { useRouter } from "next/router";
import { userProps } from "@/interface/data";
import { isAbsolute } from "path";
import { Socket } from "socket.io-client";


interface InfoGameprops {
    selectPlayer: string;
    setselectPlayer: (selectPlayer: string) => void;
    room: string;
    currentUser: userProps
    socketApp: Socket
}

const Pong = ({ selectPlayer, setselectPlayer, room, currentUser, socketApp }: InfoGameprops) => {
    let [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    let [ball, setball] = useState(new Ball(200, 50, "red", 10, GameInfo.VELOCIT, GameInfo.VELOCIT, GameInfo.SPEED));
    let [computer, setcomputer] = useState(new Player(0, 0));
    let [player, setplayer] = useState(new Player(GameInfo.PLAYER_X, GameInfo.PLAYER_Y));

    let HoAreYou = useRef(0);
    // const [HoAreYou, setHoAreYou] = useState(2)
    const myCanvasRef = useRef<HTMLCanvasElement>(null);
    const [socket, setsocket] = useState<any>();
    const [numberPlayer, setnumberPlayer] = useState(0);
    const [computerScore, setcomputerScore] = useState(0);
    const [playerScore, setplayerScore] = useState(0);
    const [gamaIsStart, setgamaIsStart] = useState(0)
    const [YouWon, setYouWon] = useState(0);
    const YouWonOrLostPlayAgain = useRef("");
    const [PlayAgainhidden, setPlayAgainhidden] = useState(false);
    const [YouLost, setYouLost] = useState(true);
    const [gameStatus, setgameStatus] = useState('Pause')
    const router = useRouter();

    useEffect(() => {
        socket?.on("start", () => {

            if (selectPlayer === 'online') {
                GameInfo.SPEED = 2;
                GameInfo.VELOCIT = 1;
                GameInfo.ACCELERATION = 0.2;
                ball.speed = GameInfo.SPEED
                ball.velocityX = GameInfo.VELOCIT;
                ball.velocityY = GameInfo.VELOCIT;
            }
            setgamaIsStart(1)
            setnumberPlayer(2);

            setInterval(() => {
                if (YouWonOrLostPlayAgain.current === "won" || YouWonOrLostPlayAgain.current === "lost") {
                    return
                }
                if (HoAreYou.current == 0) {
                    if (player.youWonRrLost == "won") {
                        YouWonOrLostPlayAgain.current = "won"
                        // setYouWonPlayAgain(true)
                    }
                    if (player.youWonRrLost == "lost") {
                        // setYouWonOrLostPlayAgain(true)
                        YouWonOrLostPlayAgain.current = "lost"
                    }
                }
                if (HoAreYou.current == 1) {
                    if (computer.youWonRrLost == "won") {
                        YouWonOrLostPlayAgain.current = "won"
                        // setYouWonPlayAgain(true)
                    }
                    if (computer.youWonRrLost == "lost") {
                        YouWonOrLostPlayAgain.current = "lost"
                        // setYouWonOrLostPlayAgain(true)
                    }
                }
                if (HoAreYou.current == 1) {
                    if (document.hidden)
                        socket?.emit("documentHidden")
                }
                startGame({ myCanvasRef, mousePosition, ball, player, computer, selectPlayer, HoAreYou });
                setcomputerScore(computer.score);
                setplayerScore(player.score);
                if (HoAreYou.current == 0) {
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
                    if (player.score >= 1) {
                        player.youWonRrLost = "won"
                    }
                    if (computer.score >= 1) {
                        player.youWonRrLost = "lost"
                    }
                }
                if (selectPlayer == "online") {
                    if (HoAreYou.current == 0) {
                        socket?.emit("dataOfplayer", player);
                    }

                    if (HoAreYou.current == 1) {
                        socket?.emit("dataOfcomputer", computer);
                    }
                    if (HoAreYou.current == 0) {

                        socket?.emit("moveBall", {
                            x: ball.x,
                            y: ball.y,
                            playerScore: player.score,
                            computerScore: computer.score,
                            statuee: gameStatus
                        });
                    }
                }
            }, 1000 / 60);
        });
    });

    useEffect(() => {
        const canvas = myCanvasRef.current;
        if (!canvas) return;
        computer.x = canvas.width;
        computer.x -= 10;
    }, []);

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
        const socketUrl = "http://localhost:8000";
        // const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://e2r9p2.1337.ma:8000";
        const newSocket = io(socketUrl, {
            query: {
                userId: currentUser.id,
            },
        });
        setsocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        socket?.on("indexPlayer", (index: number) => {
            HoAreYou.current = index;
        });

        socket?.on("ResumePause", (value: string) => {
            setgameStatus(value)
            player.status = value
            computer.status = value
        })
        socket?.on("leaveRoom", () => {
            player.status = 'Pause'
            computer.status = 'Pause'
            setYouWon(1)
        })
        socket?.on("dataOfplayer", (plyr: Player) => {
            if (HoAreYou.current == 1) {
                mousePosition.y = plyr.y;
                if (plyr.youWonRrLost === "won")
                    computer.youWonRrLost = "lost"
                if (plyr.youWonRrLost === "lost")
                    computer.youWonRrLost = "won"
            }
        });
        socket?.on("dataOfcomputer", (comptr: Player) => {
            if (HoAreYou.current == 0)
                mousePosition.x = comptr.y;
        });
        socket?.on("movebb", (obj: any) => {
            if (HoAreYou.current == 1) {
                ball.x = obj.x;
                ball.y = obj.y;
                computer.score = obj.computerScore;
                player.score = obj.playerScore;
            }
        });
        socket?.on("documentHidden", (flag: boolean) => {
            const value = "Resume"
            setgameStatus(value)
            player.status = value
            computer.status = value
        })
        socket?.on("availableRoom", (flag: boolean) => {
            console.log("this rome available")
        })
    })

    if (selectPlayer === "computer" || selectPlayer === "offline") {
        socket?.emit("startWithComputer", room);
    }

    const handleMouseMove = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        if (HoAreYou.current == 0) mousePosition.y = e.clientY - rect.top - 25;
        if (HoAreYou.current == 1) mousePosition.x = e.clientY - rect.top - 25;
    };
    const sendMessage = () => {
        setnumberPlayer(1);
        socket?.emit("joinRoom", { room: room, userId: currentUser.id });
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
        router.push('/game');
    }
    const handelButtonYouWon = () => {
        router.push("/game")
    }
    const handelButtonYouLost = () => {
        router.push("/game")
    }
    const handelButtonPlayAgain = () => {
        YouWonOrLostPlayAgain.current = ""
        computer.score = 0
        player.score = 0
        player.youWonRrLost = ""
        computer.youWonRrLost = ""
    }
    return (
        <>
            <div className="w-full h-[600px] flex justify-center items-center mt-20">
                {numberPlayer == 0 &&
                    selectPlayer === "online" ? (
                    <div>
                        <button className="bg-red-400 w-[80px] h-[90px] rounded-2xl text-3xl mx-2" onClick={sendMessage}>join room</button>
                    </div>
                ) : null}
                {numberPlayer == 1 &&
                    selectPlayer === "online" ? (
                    <div className="bg-red-400  h-[90px] pt-5  rounded-2xl text-3xl px-1 mx-2">waiting for oponenet</div>
                ) : null}
                {numberPlayer == 2 ||
                    selectPlayer === "computer" ||
                    selectPlayer === "offline" ? (
                    <div className={`${YouWon ? " hidden " : ""} w-full h-[100%] flex items-center flex-col space-y-10`}>
                        {
                            true ? (
                                <canvas
                                    className={`bg-black rounded-2xl w-[90%] h-[50%]   md:h-[60%]  md:w-[60%] 2xl:h-[70%] 2xl:w-[40%]${false ? 'hidden' : ''}`}
                                    onMouseMove={handleMouseMove}
                                    ref={myCanvasRef}
                                    height={400}
                                    width={800}
                                >
                                </canvas>
                            ) : null
                        }
                        <div className="w-[400px] h-[70px] rounded-2xl flex justify-around items-center">
                            <div className="bg-slate-400 w-[20%] h-[90%] rounded-2xl flex justify-center items-center text-3xl">
                                {player.score}
                            </div>

                            <button onClick={handelButtonGameStatus} className="bg-slate-400 w-[20%] h-[90%] rounded-2xl flex justify-center items-center text-3xl">
                                {gameStatus}
                            </button>

                            <div className="bg-slate-400 w-[20%] h-[90%] rounded-2xl flex justify-center items-center text-3xl">
                                {computer.score}
                            </div>
                            <button onClick={handelButtonLeave} className="bg-slate-400 w-[30%] h-[90%]  rounded-2xl flex justify-center items-center text-3xl">
                                leave
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
                    YouWon ? (<div className="w-[40%] h-[40%] bg-slate-200  rounded-3xl  absolute ">
                        <div className="flex flex-col items-center justify-center space-y-6 h-[50%]">
                            <h1 className="text-3xl ">You Won</h1>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-6 h-[50%]">
                            <button className="ease-in-out duration-500 bg-[#77A6F7] px-6 py-2 rounded-xl  outline outline-offset-2 outline-black hover:text-xl hover:px-8 hover:py-3 text-white font-bold"
                                onClick={handelButtonYouWon}
                            >OK</button>
                        </div>
                    </div>) : null
                }
                {
                    YouWonOrLostPlayAgain.current === 'won' ? (
                        <div className="w-[40%] h-[40%] bg-slate-200  rounded-3xl  absolute ">
                            <div className="flex flex-col items-center justify-center space-y-6 h-[50%]">
                                <h1 className="text-3xl text-green-600">You Won</h1>
                                <h3 className="text-xl ">Play Again</h3>
                            </div>
                            <div className="flex  items-center justify-center space-x-6 h-[50%]">
                                <button className="ease-in-out duration-500 bg-green-400 px-6 py-2 rounded-xl  outline outline-offset-2 outline-black hover:text-xl hover:px-8 hover:py-3 text-white font-bold"
                                    onClick={handelButtonPlayAgain}
                                >OK</button>
                                <button className="ease-in-out duration-500 bg-red-400 px-6 py-2 rounded-xl  outline outline-offset-2 outline-black hover:text-xl hover:px-8 hover:py-3 text-white font-bold"
                                    onClick={handelButtonYouLost}
                                >NO</button>
                            </div>
                            --=={YouWonOrLostPlayAgain.current}
                        </div>
                    ) : null
                }
                {
                    YouWonOrLostPlayAgain.current === 'lost' ? (
                        <div className="w-[40%] h-[40%] bg-slate-200  rounded-3xl  absolute ">
                            <div className="flex flex-col items-center justify-center space-y-6 h-[50%]">
                                <h1 className="text-3xl text-red-600">You Lost</h1>
                                <h3 className="text-xl ">Play Again</h3>
                            </div>
                            <div className="flex  items-center justify-center space-x-6 h-[50%]">
                                <button className="ease-in-out duration-500 bg-green-400 px-6 py-2 rounded-xl  outline outline-offset-2 outline-black hover:text-xl hover:px-8 hover:py-3 text-white font-bold"
                                    onClick={handelButtonPlayAgain}
                                >OK</button>
                                <button className="ease-in-out duration-500 bg-red-400 px-6 py-2 rounded-xl  outline outline-offset-2 outline-black hover:text-xl hover:px-8 hover:py-3 text-white font-bold"
                                    onClick={handelButtonYouLost}
                                >NO</button>
                            </div>
                            --=={YouWonOrLostPlayAgain.current}
                        </div>
                    ) : null
                }
                {

                }
            </div>

        </>
    );
};

export default Pong;
