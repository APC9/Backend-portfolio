import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service'; 
import { JwtPayload } from 'src/interfaces/jwt-payload.interfaces'; 


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ){}
  
  async canActivate( context: ExecutionContext):Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('There is no bearer token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token, {
          secret: process.env.JWT_SECRET,
        }
      );

      const user = await this.authService.findOne( payload.id);
      if(!user) throw new UnauthorizedException('User not found');

      request['user'] = user;

    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }


  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}