import React, { useEffect, useRef, useState, RefObject } from "react";
import { useRouter } from "next/router";


export interface InfoGameprops {
    setselectPlayer: (selectPlayer: string) => void;
    selectPlayer: string;
    canvasTheme: string
    ballTheme: string
    gameLevel: string
}
export interface GameInfoProps {
    BALL_START_SPEED: number,
    PLAYER_HEIGHT: Number,
    CANVAS_HIEGHT: number,
    PLAYER_COLOR: string,
    CANVAS_WIDTH: number,
    ACCELERATION: number,
    CANVAS_COLOR: string,
    PLAYER_WIDTH: number,
    RADIUS_BALL: number,
    BALL_COLOR: string,
    PLAYER_X: number,
    PLAYER_Y: number,
    VELOCIT: number,
    LEVEL: number,
    ANGLE: number,
    SPEED: number,
    FPS: Number,
}
export interface startGameProps {
    myCanvasRef: React.RefObject<HTMLCanvasElement>;
    mousePosition: { x: number; y: number };
    selectPlayer: string;
    computer: Player;
    player: Player;
    GameInfo: any;
    ball: Ball;
}


class Player {
    youWonRrLost: string = "";
    status: string = "Pause";
    opponentId: number = -1;
    color: string = "red";
    height: number = 100;
    width: number = 10;
    score: number = 0;
    bottom: number = 0;
    right: number = 0;
    name: string = "";
    left: number = 0;
    top: number = 0;
    x: number = 0;
    y: number = 0;
    id: number = -1;

    public constructor(x: number, y: number, widht: number, height: number, color: string) {
        this.y = y;
        this.width = widht
        this.height = height
        this.x = x;
        this.color = color
    }
    public setBorder(): void {
        this.bottom = this.y + this.height;
        this.right = this.x + this.width;
        this.left = this.x;
        this.top = this.y;
    }
}


class Ball {
    velocityX: number = 0;
    velocityY: number = 0;
    bottom: number = 0;
    right: number = 0;
    left: number = 0;
    top: number = 0;
    raduis: number;
    color: string;
    x: number = 0;
    y: number = 0;
    speed: number;
    Gameinfo: any
    public constructor(x: number, y: number, gameInfo: GameInfoProps) {
        this.velocityX = gameInfo.VELOCIT * -1;
        this.raduis = gameInfo.RADIUS_BALL;
        this.velocityY = gameInfo.VELOCIT;
        this.color = gameInfo.BALL_COLOR;
        this.speed = gameInfo.SPEED;
        this.Gameinfo = gameInfo
        this.x = x;
        this.y = y;
    }
    public setBorder(): void {
        this.bottom = this.y + this.raduis;
        this.right = this.x + this.raduis;
        this.left = this.x - this.raduis;
        this.top = this.y - this.raduis;
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
class Canvas {
    ctx: CanvasRenderingContext2D | null;
    canvas: HTMLCanvasElement;
    flag: number = 0;
    height: number;
    width: number;
    gameInfo: GameInfoProps

    public constructor(canvas: HTMLCanvasElement, GameInfo: GameInfoProps) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.height = canvas.height;
        this.width = canvas.width;
        this.gameInfo = GameInfo
    }
    public ClearCanvas(): void {
        if (!this.ctx) return;
        this.ctx.fillStyle = '#B79595'
        // this.ctx.fillStyle = this.gameInfo.CANVAS_COLOR
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // var img = new Image();
        // img.src = '/ping-pong.png';
        // this.ctx.drawImage(img, 0, -50, this.canvas.width, this.canvas.height + 100);
    }
    public drawRect(object: Player): void {
        if (!this.ctx) return;
        this.ctx.fillStyle = object.color;
        this.ctx.fillRect(object.x, object.y, object.width, object.height);
    }
    public drawTheBall(ball: Ball): void {
        if (!this.ctx) return;
        // this.ctx.fillStyle = ball.color;
        // this.ctx.beginPath();
        // this.ctx.arc(ball.x, ball.y, ball.raduis, 0, Math.PI * 2, true);
        // this.ctx.closePath();
        // this.ctx.fill();
        var img = new Image();
        img.src = '/tennis.png';
        this.ctx.drawImage(img, ball.x - 10, ball.y - 10, 20, 20);
    }

    public drawText(text: string, x: number, y: number, color: string) {
        if (!this.ctx) return;
        this.ctx.fillStyle = color;
        this.ctx.font = "40px fantasy";
        this.ctx.fillText(text, x, y);
    }

    public drawMedianLine(lineInfo: { w: number; h: number; step: number; color: string }): void {
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
    public moveBallWenCollision(ball: Ball, selectPlayer: Player): void {
        {
            let whenCollision =
                (ball.y - (selectPlayer.y + selectPlayer.height / 2)) /
                (selectPlayer.height / 2);
            const direction = ball.x > this.width / 2 ? -1 : 1;
            let newAngle = this.gameInfo.ANGLE * whenCollision;
            ball.velocityX = direction * ball.speed * Math.cos(newAngle);
            ball.velocityY = ball.speed * Math.sin(newAngle);
            ball.speed += this.gameInfo.ACCELERATION;
        }
    }
}

function LinearInterpolation(pos1: number, pos2: number, t: number) {
    return pos1 + (pos2 - pos1) * t;
}

const updateGameLoop = (MyCanvas: Canvas, mousePosition: { x: number; y: number }, ball: Ball, player: Player, computer: Player, selectPlayer: string, GameInfo: any) => {

    GameInfo.CANVAS_WIDTH = MyCanvas.width;
    GameInfo.CANVAS_HIEGHT = MyCanvas.height;
    if (selectPlayer === "computer") {
        const newY = LinearInterpolation(computer.y, ball.y - computer.height / 2, GameInfo.LEVEL);
        if (newY > -10 && (newY + computer.height < GameInfo.CANVAS_HIEGHT + 10))
            computer.y = newY;
    }
    else {
        if (mousePosition.x > -10 && (mousePosition.x + computer.height < GameInfo.CANVAS_HIEGHT + 10))
            computer.y = mousePosition.x;
    }

    if (mousePosition.y > -0 && (mousePosition.y + player.height < GameInfo.CANVAS_HIEGHT + 0))
        player.y = mousePosition.y;
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    ball.setBorder();
    player.setBorder();
    computer.setBorder();
    if (ball.bottom + 2 > GameInfo.CANVAS_HIEGHT || ball.top - 2 < 0)
        ball.velocityY *= -1;

    let selectPlayerCollision = ball.x < GameInfo.CANVAS_WIDTH / 2 ? player : computer;
    if (ball.checkCollision(selectPlayerCollision))
        MyCanvas.moveBallWenCollision(ball, selectPlayerCollision);
};

const renderGameOverScreen = (MyCanvas: Canvas, ball: Ball, player: Player, computer: Player) => {
    MyCanvas.ClearCanvas();
    MyCanvas.drawRect(player);
    MyCanvas.drawRect(computer);
    MyCanvas.drawMedianLine({ w: 2, h: 10, step: 20, color: "#FFFFFF" });
    MyCanvas.drawTheBall(ball);
};

function startGame({ myCanvasRef, mousePosition, ball, player, computer, selectPlayer, GameInfo }: startGameProps) {
    if (!myCanvasRef.current) return;
    const MyCanvas = new Canvas(myCanvasRef.current, GameInfo);
    computer.x = GameInfo.CANVAS_WIDTH - 10
    if (computer.status == 'Resume' || player.status == 'Resume')
        return
    updateGameLoop(MyCanvas, mousePosition, ball, player, computer, selectPlayer, GameInfo);
    renderGameOverScreen(MyCanvas, ball, player, computer);
}



const PlayWithComputer = ({ selectPlayer, setselectPlayer, ballTheme, canvasTheme, gameLevel }: InfoGameprops) => {

    let level: number = 0.05
    if (gameLevel == 'easy')
        level = 0.05
    if (gameLevel == 'medium')
        level = 0.08
    if (gameLevel == 'hard')
        level = 0.1

    const GameInfo = {
        FPS: 1000 / 100,
        PLAYER_COLOR: canvasTheme == "white" ? 'black' : 'white',
        PLAYER_HEIGHT: 100,
        PLAYER_WIDTH: 10,
        PLAYER_X: 0,
        PLAYER_Y: 0,

        BALL_COLOR: ballTheme != '' ? ballTheme : "red",
        BALL_START_SPEED: 2,
        ANGLE: Math.PI / 4,
        ACCELERATION: 0.8,
        RADIUS_BALL: 10,
        LEVEL: level,
        VELOCIT: 5,
        SPEED: 5,

        CANVAS_HIEGHT: 0,
        CANVAS_COLOR: canvasTheme != '' ? canvasTheme : "black",
        CANVAS_WIDTH: 0,
    };

    const [player] = useState(new Player(GameInfo.PLAYER_X, GameInfo.PLAYER_Y, GameInfo.PLAYER_WIDTH, GameInfo.PLAYER_HEIGHT, GameInfo.PLAYER_COLOR));
    const [computer] = useState(new Player(0, 0, GameInfo.PLAYER_WIDTH, GameInfo.PLAYER_HEIGHT, GameInfo.PLAYER_COLOR));
    const [ball] = useState(new Ball(200, 50, GameInfo));



    const [mousePosition] = useState({ x: 0, y: 0 });
    const [computerStatus, setcomputerStatus] = useState('');
    const [computerScore, setcomputerScore] = useState(0);
    const [playerStatus, setplayerStatus] = useState('');
    const [playerScore, setplayerScore] = useState(0);
    const YouWonOrLostPlayAgain = useRef("");

    const myCanvasRef = useRef<HTMLCanvasElement>(null);
    const router = useRouter();

    useEffect(() => {
        setInterval(() => {
            if (computer.status == 'Resume' || player.status == 'Resume')
                return
            if (YouWonOrLostPlayAgain.current === "won" || YouWonOrLostPlayAgain.current === "lost") {
                return
            }
            if (player.youWonRrLost == "won")
                YouWonOrLostPlayAgain.current = "won"

            if (player.youWonRrLost == "lost")
                YouWonOrLostPlayAgain.current = "lost"

            startGame({ myCanvasRef, mousePosition, ball, player, computer, selectPlayer, GameInfo });
            setcomputerScore(computer.score);
            setplayerScore(player.score);
            setplayerStatus(player.status)
            setcomputerStatus(computer.status)
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
        }, GameInfo.FPS);

    }, []);

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
                mousePosition.y += 1;
            }
            if (keyPressed === "w") {
                mousePosition.y -= 1;
            }
            if (keyPressed === "ArrowDown") {
                mousePosition.x += 1;
            }
            if (keyPressed === "ArrowUp") {
                mousePosition.x -= 1;
            }
        });
    }, []);

    const handleMouseMove = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        mousePosition.y = e.clientY - rect.top - 50;
        // mousePosition.x = e.clientY - rect.top - 25;
    };

    const handelButtonGameStatus = () => {
        const status = player.status === 'Pause' ? 'Resume' : 'Pause'
        computer.status = status
        player.status = status
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
        ball.velocityX = -GameInfo.VELOCIT;
        ball.velocityY = GameInfo.VELOCIT;
        YouWonOrLostPlayAgain.current = ""
        computer.youWonRrLost = ""
        player.youWonRrLost = ""
        computer.score = 0
        player.score = 0
        ball.x = 200;
        ball.y = 50;
    }
    // const divHieght = useRef(400)
    return (
        <div className="Gamebackground w-full h-screen -z-10  flex justify-center items-center">

            <div className="  relative w-full h-[600px] flex justify-center items-center mt-20 "
            >

                {
                    selectPlayer === "computer" ||
                        selectPlayer === "offline" ? (
                        <div className={` relative w-full h-[100%] flex items-center flex-col space-y-10`}>
                            <div className="h-10 z-20 bg-red-100 lg:bg-blue-300 md:bg-red-300 2xl:bg-red-600">aa</div>
                            <canvas
                                className={` bg-blac rounded-lg md:rounded-2xl w-[99%] h-[70%]   md:h-[70%]  md:w-[60%] 2xl:h-[100%] 2xl:w-[60%] `}
                                ref={myCanvasRef}
                                height={450}
                                onMouseMove={handleMouseMove}
                                width={900}
                            >
                            </canvas>
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

        </div>

    );
};

export default PlayWithComputer;
