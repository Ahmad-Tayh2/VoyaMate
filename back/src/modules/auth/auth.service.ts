import { Itinerary } from './../itinerary/itinerary.entity';
import { JwtSignOptions } from './../../../node_modules/@nestjs/jwt/dist/interfaces/jwt-module-options.interface.d';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { ConfigService } from '@nestjs/config';
import { AddUserDTO } from './dtos/add-user.dto';

@Injectable()
export class AuthService {
  private secret_key: string;
    constructor(
      
        private readonly userService:UserService,
        private readonly jwtservice:JwtService,
        private readonly configService:ConfigService,
        
    ){
      this.secret_key=this.configService.get<string>('JWT_SECRET_KEY')
    }

    async addUser(AddUserDTO: AddUserDTO): Promise<User> {
        return this.userService.createUser(AddUserDTO); 
        }

    async validateUser(email:string,password:string):Promise<any>{
        const user=await this.userService.findByEmail(email);
        if(user && bcrypt.compare(password,user.password)){
            const {password, ...result}=user;
            return result;
        }
        throw new UnauthorizedException('invalid email or password')
    }
    async login(user:any){
        const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtservice.sign(payload,{
        secret: this.secret_key, 
        expiresIn:'1h'
      }),
    };
    }
    generateResetToken(user: User): string {
        const payload = { email: user.email, sub: user.id };
        return this.jwtservice.sign(payload, { secret:this.secret_key, expiresIn: '1h' });
      }
    async verifyResetToken(token: string): Promise<number | null> {
        try {
          const decoded = this.jwtservice.verify(token, { secret:this.secret_key });
          return decoded.sub; // Retourner l'ID de l'utilisateur
        } catch (error) {
          return null; 
        }
      } 

    //added more generic methods
    generateToken(payload: Record<string, any>, expirationTime: string): string {
      return this.jwtservice.sign(payload, { secret: this.secret_key, expiresIn: expirationTime });
    } 
    async verifyToken(token: string):Promise<any>{
      const decoded = this.jwtservice.verify(token, { secret:this.secret_key });
      console.log(decoded)
      return decoded
    }

    async verifyUserEmail(token:string){
      try{
        const { userId } = await this.verifyToken(token);
        const user= await this.userService.findUserById(userId)
        user.verifiedAt=new Date();
        await this.userService.updateUser(user);
      }
      catch (error) {
        console.error(error);
        throw new HttpException("Invalid or expired email verification token", HttpStatus.UNAUTHORIZED)
      }      
  }
      
}
