import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { AddUserDTO } from './dto/add-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private repository: Repository<User>
 ){}

    async addUser(addUserDTO: AddUserDTO):User {

        const newUser=this.repository.create({...addUserDTO,
            verifiedAt: null,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        this.repository.save(newUser);
        return newUser;
    }
}
