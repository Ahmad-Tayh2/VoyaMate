import { Body, Controller,Post } from '@nestjs/common';
import { AddUserDTO } from '../../dtos/add-user.dto';
import { User } from 'src/modules/user/user.entity';
import { SignupService } from '../../services/signup/signup.service';

@Controller('signup')
export class SignupController {
    constructor(private readonly signupService: SignupService) {}

    @Post()
    async registerUser(@Body() addUserDTO: AddUserDTO): Promise<User | Error> {
        try {
            const user = await this.signupService.addUser(addUserDTO);
            return user;
        } catch (err) {
            return err;
        }
    }
}
