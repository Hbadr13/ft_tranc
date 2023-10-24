import { IsEmail, IsNotEmpty, IsNumber, IsString, isString } from 'class-validator'

export class updateDto {
    @IsNumber()
    @IsNotEmpty()
    opponentId: Number;

    @IsString()
    @IsNotEmpty()
    stauts: string;

    @IsNumber()
    @IsNotEmpty()
    myGools: Number;

    @IsNumber()
    @IsNotEmpty()
    opponentGools: Number;

}
