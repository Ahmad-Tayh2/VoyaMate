import { JwtSignOptions } from './../../../node_modules/@nestjs/jwt/dist/interfaces/jwt-module-options.interface.d';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    async addUser(addUserDTO: AddUserDTO): Promise<User> {
        return this.userService.createUser(addUserDTO); 
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
        secret: this.secret_key, //added this because it didnt work without specifying the secret key
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
}
