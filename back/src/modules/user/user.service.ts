import { Injectable } from '@nestjs/common';
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
        const hashedPassword = await bcrypt.hash(addUserDTO.password, this.saltOrRounds);
        const newUser=this.repository.create({
            username: addUserDTO.username,
            email: addUserDTO.email,
            password: hashedPassword,
            phone: addUserDTO.phone,
            verifiedAt: null,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        this.repository.save(newUser);
        return newUser;
    }

}
