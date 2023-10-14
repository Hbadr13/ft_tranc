import { Body, Controller, Get, Post, Req, UseGuards, Res, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service'
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { FortyTwoStrategy } from './42.strategy';
import { JwtService } from '@nestjs/jwt';
import { Response,Request } from 'express';



@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService){
    }
    @Post('signup')
    signup(@Body() dto: AuthDto){
        console.log({
            dto,
        });
        return this.authService.signup(dto);
    }
    @Post('signin')
    async signin(@Body() dto: AuthDto,
    @Res({passthrough: true}) response:Response){
        const user = await this.authService.signin(dto);
        const jwt = await this.jwtService.signAsync({id: user.id});
        response.cookie('jwt', jwt, { httpOnly: true });
        return {
         message: 'succes',  
         status: 201
        };
    }
    @Get('42')
    @UseGuards(AuthGuard('42'))
    async fortyTwoAuth(
        @Req() req: Request,
        @Res() res: Response,
      ) {

    }
    
    @Get('42/callback')
    @UseGuards(AuthGuard('42'))
    async fortyTwoAuthCallback(@Req() req,  @Res({passthrough: true}) response:Response) {
         const user = await this.authService.login(req.user);
        //  console.log("ssssss");
         const jwt = await this.jwtService.signAsync({id: user.id}) 
         response.cookie('jwt', jwt, { httpOnly: true });
          response.redirect('http://localhost:3000/');
    }
    @Get('user')
    async user(@Req() request:Request){
        try{
            const cookie = request.cookies['jwt'];
            const condition = await this.jwtService.verifyAsync(cookie);
            if(!condition){
                
                throw  new UnauthorizedException();
            }
            const user = await this.authService.findOne({id: condition['id']});
            //     console.log('JWT Cookie:', user);
            const {hash, ...result} = user;
            return result;  
        }catch(e)
        {
            throw new UnauthorizedException()
        }
    }
    @Post('logout')
    async logout(@Res({passthrough: true})response:Response){
        response.clearCookie('jwt');
        return {
            message: 'success',
            status: 201
        }

    }
    


}
