import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  isInt,
  isString,
} from 'class-validator';

export class updateDto {
  @IsNumber()
  @IsNotEmpty()
  opponentId: Number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  myGools: Number;

  @IsNumber()
  @IsNotEmpty()
  opponentGools: Number;
}

export class roomDto {
  @IsString()
  @IsNotEmpty()
  room: string;
}

export class AchievementDto {
  @IsInt()
  @Min(0)
  @Max(100)
  @IsNotEmpty()
  points: number;
}
