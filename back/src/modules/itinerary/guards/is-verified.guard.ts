import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class IsVerifiedGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findUserById(request.user.userId);
    if (!user) {
      throw new UnauthorizedException("User not found")
    }
    if (!user.verifiedAt) {
      throw new UnauthorizedException(`User is not verified`);
    }
    return true;
  }
}
