import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

import { verifyAndDecode } from '../utils/jwt'

export interface AuthRequest extends Request {
  user: User,
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  async use(req: AuthRequest, res: Response, next: () => any): Promise<void> {
    const token = this.getAuthTokenFromRequest(req);

    try {
      const user  = await verifyAndDecode<User>(token, this.configService.get<string>('JWT_SECRET'));
      
      req.user = user;
      next();
    } catch (e) {
      throw new UnauthorizedException(`${e.name}: ${e.message}`);
    }
  }

  private getAuthTokenFromRequest(req: Request): string | null {
    if (req.headers['authorization'] && req.headers['authorization'].split(' ')[0]?.toLowerCase() === 'bearer') {
      return req.headers['authorization'] .split(' ')[1];
    }

    return null;
  }
}
