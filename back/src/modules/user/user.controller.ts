import { Controller, Post,Body } from '@nestjs/common';
import { AddUserDTO } from './dto/add-user.dto';
import {User} from '../user/user.entity'
import {UserService} from '../user/user.service'

@Controller('user')

export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/register")
    async registerUser(@Body() addUserDTO: AddUserDTO): Promise<User | Error> {
        try {
            const user = await this.userService.addUser(addUserDTO);
            return user;
        } catch (err) {
            return err;
        }
    }
}
