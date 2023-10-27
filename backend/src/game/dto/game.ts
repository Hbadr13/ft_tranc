import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
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
