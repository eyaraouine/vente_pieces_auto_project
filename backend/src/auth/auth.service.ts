import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginCredentialsDto } from './dtos/login-credentials.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { UserRoleEnum } from './enums/user-role.enum';
import { CrudService } from '../generic/crud/crud.Service';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';

@Injectable()
export class AuthService extends CrudService<User, CreateUserDto, UpdateUserDto>{
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    super(userRepository);
  }

  async register(credentials: Partial<User>) {
    const user = await this.userRepository.create({
      ...credentials,
    });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      return await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(
        'Le login et le mot de passe doivent être uniques',
      );
    }
  }

  async login(credentials: LoginCredentialsDto) {
    const { login, password } = credentials;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username= :login or user.email= :login', { login })
      .getOne();

    console.log(user);
    if (!user) {
      throw new NotFoundException('Le login ou le mot de passe est incorrect.');
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect);
    if (isPasswordCorrect) {
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const token = await this.jwtService.sign(payload);

      return {
        token: token,
      };
    } else {
      throw new NotFoundException('Le login ou le mot de passe est incorrect.');
    }
  }

  async createUser(id: number, email: string) : Promise<string> {
    const user = {
      id: id,
      email: email,
      username: "user" + Math.floor(Math.random() * 1000000),
      password: "",
      salt: "",
      role: UserRoleEnum.PROVIDER,
    } as User;
    const t = await this.jwtService.sign(JSON.parse(JSON.stringify(user)));
    return t;
  }

}
