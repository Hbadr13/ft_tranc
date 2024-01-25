// src/auth/42.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-42';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Constant } from 'src/constants/constant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(config: ConfigService) {
  

      super({
        clientID:  config.get('clientID'),
        clientSecret: config.get('clientSecret'),
        callbackURL: `${Constant.API_URL_SERVER}/auth/42/callback`,
        
        
      });
    
    }
  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    // Implement user creation or retrieval logic here
    // Return the user or null if the user is not found
    
    // const  {name, emails}= profile;
    try {

      // Implement user creation or retrieval logic here
      // Return the user or null if the user is not found
    
      const user = {
        firstName: profile.name.givenName,
        email: profile.emails[0].value,
        lastName: profile.name.familyName,
        avatar: profile._json.image.link,
        username: profile.username,
      };

      // You can also handle additional validation logic here
      // For example, check if the user exists in your database
      // console.log('Received profile:', profile);
      if (user) {
        done(null, user);
      } else {
        // If the user is not found, pass an error
        done(new Error('User not found'), null);
      }
    } catch (error) {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); //Handle and pass the error to the done function
    }
  }
}
function accessTokenIsInvalid(accessToken: string) {
  throw new Error('Function not implemented.');
}

