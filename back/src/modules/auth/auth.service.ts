import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AddUserDTO } from './dtos/add-user.dto';
import { UserService } from 'src/modules/user/user.service';


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService
    ) {}

async addUser(addUserDTO: AddUserDTO): Promise<User> {
    return this.userService.createUser(addUserDTO); 
    }

}
