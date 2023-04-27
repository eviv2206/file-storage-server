import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAuthenticationService } from '../../../service/authentication/authentication.service.abstraction';
import { UserInfo } from '../../../service/authentication/model/UserInfo';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  @Inject()
  private authenticationService: IAuthenticationService;

  constructor(private configService: ConfigService) {
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  public async validate(payload: { id: number }): Promise<UserInfo> {
    return this.authenticationService.getUserById(payload.id);
  }

}
