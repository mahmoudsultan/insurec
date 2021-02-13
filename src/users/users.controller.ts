import { Controller, Post, Body, Get, Req, UnauthorizedException, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserViewBlueprint } from './views/user.view';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id/traits')
  async userWithTrais(@Param('id') userId) {
    userId = Number.parseInt(userId);
    const userWithTrais = await this.usersService.userWithTrais(userId);

    return UserViewBlueprint.renderWithTraits(userWithTrais);
  }

  @Get('/profile')
  async userProfile(@Req() req) {
    return UserViewBlueprint.render(req.user);
  }

  @Post('/login')
  async login(@Body() { email, password }) {
    try {
      const token = await this.usersService.login(email, password);
      return {
        token,
      }
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  @Post()
  async signup(@Body() bodyParams: CreateUserDto) {
    const createdUser = await this.usersService.signUp(bodyParams);

    return { 
      user: UserViewBlueprint.render(createdUser),
      token: await this.usersService.generateJWT(createdUser),
    };
  }
}