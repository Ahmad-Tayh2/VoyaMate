import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AddUserDTO } from '../auth/dtos/add-user.dto';

@Injectable()
export class UserService {
    saltOrRounds: number = 10;

    constructor(
        @InjectRepository(User) 
        private repository: Repository<User>
    ){}

    async createUser(AddUserDTO: AddUserDTO):Promise<User> {
        const hashedPassword = await bcrypt.hash(AddUserDTO.password, this.saltOrRounds);
        const newUser=this.repository.create({
            username: AddUserDTO.username,
            email: AddUserDTO.email,
            password: hashedPassword,
            phone: AddUserDTO.phone,
        });
        const savedUser=await this.repository.save(newUser);
        return savedUser;
    }

    async findUserById(userId: number): Promise<User | null> {
        const user = await this.repository.findOne({ where :{id:userId}, relations:['memberItineraries'] });       
       return user
    }
    async updateUser(user: User): Promise<User> {
        const updatedUser = await this.repository.save(user);
        return updatedUser;
    }

    async findByEmail(email: string): Promise<User | undefined> {
      const user = await this.repository.findOne({ where: { email }, relations:['memberItineraries'] });
      return user;
    }
    async updatePassword(userId: number, newPassword: string): Promise<void> {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.repository.update(userId, { password: hashedPassword });
    }
    
  }