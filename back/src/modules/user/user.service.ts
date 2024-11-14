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

    async createUser(addUserDTO: AddUserDTO):Promise<User> {
        //we dont need to check if the user already exists because we set up a pipe for the email address
        const hashedPassword = await bcrypt.hash(addUserDTO.password, this.saltOrRounds);
        const newUser=this.repository.create({
            username: addUserDTO.username,
            email: addUserDTO.email,
            password: hashedPassword,
            phone: addUserDTO.phone,
        });
        const savedUser=await this.repository.save(newUser);
        return savedUser;
    }

    async findUserById(userId: number): Promise<User> {
        const user = await this.repository.findOne({ where :{id:userId} });
        if (! user){
            throw new NotFoundException(`User with id ${userId} not found`);
        }
       return user
    }
    async updateUser(user: User): Promise<User> {
        const updatedUser = await this.repository.save(user);
        return updatedUser;
    }

    async findByEmail(email: string): Promise<User | undefined> {
      const user = await this.repository.findOne({ where: { email } });
      console.log('User found:', user); // Afficher le résultat dans la console
      return user;
    }
    async updatePassword(userId: number, newPassword: string): Promise<void> {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.repository.update(userId, { password: hashedPassword });
    }
    
  }