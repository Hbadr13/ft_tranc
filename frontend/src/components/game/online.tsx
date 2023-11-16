import React, { useEffect, useRef, useState, RefObject } from "react";
// import { startGame } from "./main";
// import { Player, Ball, GameInfo } from "./class";
import { InfoGameFromClientProps } from "@/interface/model";
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

const PlayOnline = ({ selectPlayer, setselectPlayer, room, currentUser, socketApp }: InfoGameprops) => {

    class Player {
        name: string = "";
        x: number = 0;
        y: number = 0;
        width: number = 10;
        height: number = 100;
        color: string = "#FFFFFF";
        top: number = 0;
        bottom: number = 0;
        right: number = 0;
        left: number = 0;
        score: number = 0;
        status: string = "Pause";
        youWonRrLost: string = "";
        id: number = -1;
        opponentId: number = -1;

        public constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
        public setBorder(): void {
            this.top = this.y;
            this.bottom = this.y + this.height;
            this.right = this.x + this.width;
            this.left = this.x;
        }
    }

    class Ball {
        raduis: number;
        color: string;
        x: number = 0;
        y: number = 0;
        top: number = 0;
        bottom: number = 0;
        right: number = 0;
        left: number = 0;
        velocityX: number = 0;
        velocityY: number = 0;
        speed: number;
        public constructor(
            x: number,
            y: number,
            color: string,
            raduis: number,
            velocityX: number,
            velocityY: number,
            speed: number
        ) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.raduis = raduis;
            this.velocityX = velocityX * -1;
            this.velocityY = velocityY;
            this.speed = speed;
        }
        public setBorder(): void {
            this.top = this.y - this.raduis;
            this.bottom = this.y + this.raduis;
            this.right = this.x + this.raduis;
            this.left = this.x - this.raduis;
        }
        public checkCollision(selectPlayer: Player): boolean {
            return (
                this.bottom > selectPlayer.top &&
                this.top < selectPlayer.bottom &&
                this.right > selectPlayer.left &&
                this.left < selectPlayer.right
            );
        }
    }

    const GameInfo = {
        FPS: 1000 / 60,
        PLAYER_HEIGHT: 100,
        PLAYER_WIDTH: 10,
        PLAYER_X: 0,
        PLAYER_Y: 0,
        BALL_START_SPEED: 2,
        RADIUS_BALL: 10,
        VELOCIT: 0.1,
        LEVEL: 0.005,
        ANGLE: Math.PI / 4,
        SPEED: 0.3,
        CANVAS_WIDTH: 0,
        CANVAS_HIEGHT: 0,
        ACCELERATION: 0.05,
    };

    class Canvas {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D | null;
        width: number;
        height: number;
        flag: number = 0;
        public constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
            this.ctx = this.canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;
        }
        public ClearCanvas(): void {
            if (!this.ctx) return;
            this.ctx.fillStyle = "#000000";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        public drawRect(object: Player): void {
            if (!this.ctx) return;
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.fillRect(object.x, object.y, object.width, object.height);
        }
        public drawCircle(ball: Ball): void {
            if (!this.ctx) return;
            this.ctx.fillStyle = ball.color;
            this.ctx.beginPath();
            this.ctx.arc(ball.x, ball.y, ball.raduis, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fill();
        }

        public drawText(text: string, x: number, y: number, color: string) {
            if (!this.ctx) return;
            this.ctx.fillStyle = color;
            this.ctx.font = "40px fantasy";
            this.ctx.fillText(text, x, y);
        }

        public drawMedianLine(lineInfo: {
            w: number;
            h: number;
            step: number;
            color: string;
        }): void {
            if (!this.ctx) return;
            for (let i = 0; i < 2000; i += lineInfo.step) {
                this.ctx.fillStyle = lineInfo.color;
                this.ctx.fillRect(
                    this.width / 2 - lineInfo.w / 2,
                    i,
                    lineInfo.w,
                    lineInfo.h
                );
            }
        }
        public moveBall(ball: Ball, selectPlayer: Player): void {
            {
                let angle = Math.PI / 4;
                let whenCollision =
                    (ball.y - (selectPlayer.y + selectPlayer.height / 2)) /
                    (selectPlayer.height / 2);
                const direction = ball.x > this.width / 2 ? -1 : 1;
                let newAngle = GameInfo.ANGLE * whenCollision;
                ball.velocityX = direction * ball.speed * Math.cos(newAngle);
                ball.velocityY = ball.speed * Math.sin(newAngle);
                ball.speed += GameInfo.ACCELERATION;
            }
        }
    }



    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [ball, setball] = useState(new Ball(200, 50, "red", 10, GameInfo.VELOCIT, GameInfo.VELOCIT, GameInfo.SPEED));
    const [computer, setcomputer] = useState(new Player(0, 0));
    const [player, setplayer] = useState(new Player(GameInfo.PLAYER_X, GameInfo.PLAYER_Y));
    const HoAreYou = useRef(0);
    const myCanvasRef = useRef<HTMLCanvasElement>(null);
    const [socket, setsocket] = useState<any>();
    const [numberPlayer, setnumberPlayer] = useState(0);
    const [computerScore, setcomputerScore] = useState(0);
    const [playerScore, setplayerScore] = useState(0);

    const [computerStatus, setcomputerStatus] = useState('');
    const [playerStatus, setplayerStatus] = useState('');
    // const [gameStatus, setgameStatus] = useState('Pause')
    const [gamaIsStart, setgamaIsStart] = useState(0)
    const [YouWon, setYouWon] = useState(0);
    const YouWonOrLostPlayAgain = useRef("");
    // const [opponentId, setopponentId] = useState<Number>(-1);
    const opponentIdd = useRef<Number>(-1);

    const router = useRouter();


    function LinearInterpolation(pos1: number, pos2: number, t: number) {
        return pos1 + (pos2 - pos1) * t;
    }

    const updateGameLoop = (MyCanvas: Canvas, mousePosition: { x: number; y: number }, ball: Ball, player: Player, computer: Player, selectPlayer: string, HoAreYou: any) => {

        GameInfo.CANVAS_WIDTH = MyCanvas.width;
        GameInfo.CANVAS_HIEGHT = MyCanvas.height;
        if (selectPlayer === "computer") {
            const newY = LinearInterpolation(computer.y, ball.y - computer.height / 2, GameInfo.LEVEL);
            if (newY > -10 && (newY + computer.height < MyCanvas.height + 10))
                computer.y = newY;
        }
        else {
            if (mousePosition.x > -10 && (mousePosition.x + computer.height < MyCanvas.height + 10))
                computer.y = mousePosition.x;
        }

        if (mousePosition.y > -10 && (mousePosition.y + player.height < MyCanvas.height + 10))
            player.y = mousePosition.y;
        if (HoAreYou.current == 1)
            return

        ball.x += ball.velocityX;
        ball.y += ball.velocityY;
        ball.setBorder();
        player.setBorder();
        computer.setBorder();
        if (ball.bottom + 2 > MyCanvas.height || ball.top - 2 < 0)
            ball.velocityY *= -1;

        let selectPlayerCollision = ball.x < MyCanvas.width / 2 ? player : computer;
        if (ball.checkCollision(selectPlayerCollision))
            MyCanvas.moveBall(ball, selectPlayerCollision);
    };

    const renderGameOverScreen = (
        MyCanvas: Canvas,
        ball: Ball,
        player: Player,
        computer: Player
    ) => {
        MyCanvas.ClearCanvas();
        MyCanvas.drawRect(player);
        MyCanvas.drawRect(computer);
        MyCanvas.drawMedianLine({ w: 2, h: 10, step: 20, color: "#FFFFFF" });
        MyCanvas.drawCircle(ball);

        MyCanvas.drawText(String(player.score), 300, 60, "white");
        MyCanvas.drawText(String(computer.score), 700, 60, "white");
    };
    interface startGameProps {
        myCanvasRef: React.RefObject<HTMLCanvasElement>;
        mousePosition: { x: number; y: number };
        ball: Ball;
        player: Player;
        computer: Player;
        selectPlayer: string;
        HoAreYou: any
    }
    function startGame({ myCanvasRef, mousePosition, ball, player, computer, selectPlayer, HoAreYou }: startGameProps) {
        if (!myCanvasRef.current) return;
        const MyCanvas = new Canvas(myCanvasRef.current);
        computer.x = MyCanvas.width - 10
        if (computer.status == 'Resume' || player.status == 'Resume')
            return
        updateGameLoop(MyCanvas, mousePosition, ball, player, computer, selectPlayer, HoAreYou);
        renderGameOverScreen(MyCanvas, ball, player, computer);
    }






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
                if (computer.status == 'Resume' || player.status == 'Resume')
                    return
                if (YouWonOrLostPlayAgain.current === "won" || YouWonOrLostPlayAgain.current === "lost") {
                    {
                        // const s = (new Player(0, 0));
                        // console.log('score:', s.score)
                        // setplayer(new Player(GameInfo.PLAYER_X, GameInfo.PLAYER_Y));
                        return
                    }
                }
                // console.log('problem--->', computer.status, '~', player.status)
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
                if (YouWonOrLostPlayAgain.current === "won" || YouWonOrLostPlayAgain.current === "lost") {
                    {
                        try {
                            const sendData = async () => {
                                // if (HoAreYou.current == 0) {
                                //     console.log('myGools:', player.score)
                                //     console.log('opponentGools :', computer.score)

                                // } else if (HoAreYou.current == 1) {
                                //     console.log('myGools:', computer.score)
                                //     console.log('opponentGools:', player.score)

                                // }
                                // console.log()
                                const response = await fetch(`http://localhost:3333/game/update/${currentUser.id}`, {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        opponentId: opponentIdd.current,
                                        status: YouWonOrLostPlayAgain.current,
                                        myGools: HoAreYou.current == 0 ? player.score : computer.score,
                                        opponentGools: HoAreYou.current == 0 ? computer.score : player.score,
                                    }),
                                })

                            }
                            sendData()
                        } catch (error) {

                        }
                    }
                }
                startGame({ myCanvasRef, mousePosition, ball, player, computer, selectPlayer, HoAreYou });
                setcomputerScore(computer.score);
                setplayerScore(player.score);
                setplayerStatus(player.status)
                setcomputerStatus(computer.status)
                if (HoAreYou.current == 0) {
                    if (ball.x < 0) {
                        computer.score += 1;
                        ball.x = GameInfo.CANVAS_WIDTH / 2;
                        ball.y = GameInfo.CANVAS_HIEGHT / 2;
                        ball.velocityX = -GameInfo.VELOCIT;
                        ball.velocityY = GameInfo.VELOCIT;
                        ball.speed = GameInfo.SPEED
                    }
                    if (ball.x > GameInfo.CANVAS_WIDTH) {
                        player.score += 1;
                        ball.x = GameInfo.CANVAS_WIDTH / 2;
                        ball.y = GameInfo.CANVAS_HIEGHT / 2;
                        ball.velocityX = -GameInfo.VELOCIT;
                        ball.velocityY = GameInfo.VELOCIT;
                        ball.speed = GameInfo.SPEED
                    }
                    if (player.score >= 3) {
                        player.youWonRrLost = "won"
                    }
                    if (computer.score >= 3) {
                        player.youWonRrLost = "lost"
                    }
                }
                if (selectPlayer == "online") {
                    if (opponentIdd.current == -1)
                        socket.emit("opponentId", currentUser.id)
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
                            // statuee: gameStatus
                        });
                    }
                }
            }, 1000 / 60);
        });
    },[socket]);

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
        try {
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

        } catch (error) {

        }
    }, []);

    useEffect(() => {
        socket?.on("opponentId", (oppnenid: number) => {
            // console.log('oppnenid====>>', oppnenid)
            // computer.id = currentUser.id
            // computer.opponentId = oppnenid
            // player.id = currentUser.id
            // player.opponentId = oppnenid
            opponentIdd.current = oppnenid
            // setopponentId(oppnenid)
        })
        socket?.on("indexPlayer", (index: number) => {
            HoAreYou.current = index;
        });

        socket?.on("ResumePause", (value: string) => {
            // setgameStatus(value)
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
            // setgameStatus(value)
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
    const sendMessage = async () => {
        try {
            const response = await fetch(`http://localhost:3333/game/room/${currentUser.id}`, {
                credentials: 'include',
            })

            // console.log(response)
            if (response.status == 200) {
                const content = await response.json()
                if (content.room == "") {
                    router.push("/game")
                }
                // console.log(content.room)
                setnumberPlayer(1);
                socket?.emit("joinRoom", { room: content.room, userId: currentUser.id });
            }
        } catch (error) {

        }
    };
    const handelButtonGameStatus = () => {
        const status = player.status === 'Pause' ? 'Resume' : 'Pause'
        socket?.emit('ResumePause', status)
        computer.status = status
        player.status = status
        // setgameStatus(status)
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
                                {player.status}
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

export default PlayOnline;
