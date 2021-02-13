import { Controller, Post, Body, Get, Req, UnauthorizedException, Param, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ApiImplicitQuery, ApiOkResponse, ApiBearerAuth, ApiModelProperty, ApiCreatedResponse, ApiUseTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserViewBlueprint, UserWithTraitsView, UserView } from './views/user.view';
import { LoginDto } from './dto/login.dto';

class TokenResponse {
  @ApiModelProperty({ description: 'JWT Token', type: String })
  readonly token: string;
}

class UserWithToken extends TokenResponse {
  @ApiModelProperty({ description: 'User Info', type: UserView })
  readonly user: UserView;
}

@Controller('users')
@ApiUseTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id/traits')
  @ApiImplicitQuery({ name: 'id', description: 'ID of user to return list of traits for' })
  @ApiOkResponse({ type: UserWithTraitsView })
  async userWithTrais(@Param('id') userId) {
    userId = Number.parseInt(userId);
    const userWithTrais = await this.usersService.userWithTrais(userId);

    return UserViewBlueprint.renderWithTraits(userWithTrais);
  }

  @Get('/profile')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserView })
  async userProfile(@Req() req) {
    return UserViewBlueprint.render(req.user);
  }

  
  @Post('/login')
  @ApiOkResponse({ type: TokenResponse })
  async login(@Body() { email, password }: LoginDto) {
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
  @ApiCreatedResponse({ type: UserWithToken })
  async signup(@Body() bodyParams: CreateUserDto) {
    let createdUser;
    try {
      createdUser = await this.usersService.signUp(bodyParams);
    } catch (e) {
      if (e.message.includes('Input:')) {
        throw new BadRequestException(e.message);
      }

      console.error(e);
      throw new InternalServerErrorException('SOMETHING WENT WRONG... PLEASE TRY AGAIN LATER.');
    }

    return { 
      user: UserViewBlueprint.render(createdUser),
      token: await this.usersService.generateJWT(createdUser),
    };
  }
}
