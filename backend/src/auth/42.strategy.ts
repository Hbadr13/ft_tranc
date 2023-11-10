// src/auth/42.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-42';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor() {
  

      super({
        clientID: 'u-s4t2ud-e9b9f639acf5e3e698308785599b9e071818393fbeace281d5b697ed69d4e9b0',
        clientSecret: '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',
        callbackURL: 'http://localhost:3333/auth/42/callback',
        
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

