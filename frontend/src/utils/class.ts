export class Player {
  name: string = "";
  x: number = 0;
  y: number = 0;
  width: number = 10;
  height: number = 50;
  color: string = "#FFFFFF";
  top: number = 0;
  bottom: number = 0;
  right: number = 0;
  left: number = 0;
  score: number = 0;
  status: string = 'Pause';
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

export class Ball {
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

  public constructor(
    x: number,
    y: number,
    color: string,
    raduis: number,
    velocityX: number,
    velocityY: number
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.raduis = raduis;
    this.velocityX = velocityX * -1;
    this.velocityY = velocityY;
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

export const GameInfo = {
  FPS: 1000 / 60,
  PLAYER_HEIGHT: 100,
  PLAYER_WIDTH: 10,
  PLAYER_X: 0,
  PLAYER_Y: 0,
  BALL_START_SPEED: 2,
  RADIUS_BALL: 10,
  VELOCIT: 0.3,
  LEVEL: 0.05,
  ANGLE: Math.PI / 4,
  SPEED: 0.5,
  CANVAS_WIDTH: 0,
  CANVAS_HIEGHT: 0,
  you:-1
};

export class Canvas {
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
  // public Clear(): void {
  // if (!this.ctx) return;
  // this.ctx.fillStyle = "#000000";
  // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  // }
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
      ball.velocityX = direction * GameInfo.SPEED * Math.cos(newAngle);
      ball.velocityY = GameInfo.SPEED * Math.sin(newAngle);
      // GameInfo.SPEED += 0.1;
    }
  }
}
