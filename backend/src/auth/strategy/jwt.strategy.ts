import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PayloadInterface } from "../interfaces/payload.interface";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private configService:ConfigService,
        @InjectRepository(User)
        private userRepository:Repository<User>){
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: configService.get('SECRET')
    })}
    async validate(payload :PayloadInterface):Promise<Partial<User>> {
        const user=await this.userRepository.findOne({where:{username:payload.username}})
       if(user)
      { const {password,salt,...data}=user;
        return data;
      }
      else{
        throw new UnauthorizedException("Echec d'autorisation !");
      }
}
}