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

    addUser(addUserDTO: AddUserDTO):User {

        const dto_2_user: User = {
            id: 1,
            username:addUserDTO.username,
            email: addUserDTO.email,
            password: addUserDTO.password,
            phone:addUserDTO.phone,
            verifiedAt:null,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const newUser=this.repository.create(dto_2_user);
        this.repository.save(newUser);
        return newUser;
    }
}
