import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import * as cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class OnlineService {

  async checkuserIfAuth(tokens: string) {
    try {
      if (!tokens) {
        throw new UnauthorizedException('JWT token is missing.');
      }
      const decodedToken = jwt.verify(tokens, '/BZ$ySv`Gr.8p[0>.4himJ46S@r,UKLx`R/h?K*,fXv2@9}7Hg+RF?so56|6au#');
      if (!decodedToken) {
        throw new UnauthorizedException('JWT token is invalid.');
      }
      return {
        id: decodedToken['id']
      }
    } catch (e) {

      throw new UnauthorizedException();
    }
  }
}