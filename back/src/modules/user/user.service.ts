import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { AddUserDTO } from './dto/add-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    saltOrRounds: number = 10;

    constructor(
    @InjectRepository(User)
    private repository: Repository<User>
 ){}

    async addUser(addUserDTO: AddUserDTO):Promise<User> {
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
