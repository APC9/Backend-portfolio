import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Model, isValidObjectId } from 'mongoose';
import { compareSync, hashSync } from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from 'src/interfaces/jwt-payload.interfaces';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectModel( User.name )
    private userModel: Model<User>,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ){}

  async create(createUserDto: CreateUserDto) {
    let user: User;
    user = await this.userModel.findOne({ email: createUserDto.email });

    if( user ){
      throw new BadRequestException('There is already a user with that email')
    }     

    try {
      const { password, ...userData } = createUserDto;
      user = new this.userModel({
        ...userData,
        password: hashSync( password, 10 )
      })

      await user.save();
      const { password:_, ...newUser } = user.toJSON();

      return{
        newUser,
        token: this.getJwtToken({ id: newUser._id})
      }
    } catch (error) {
      
    }
  }

  async login(loginUserDto: LoginUserDto){

    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email })

    if (!user ){
      throw new UnauthorizedException('Invalid user credentials');
    }

    if ( !compareSync(password, user.password) ) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    const { password:_, ...rest  } = user.toJSON();

    return {
      user: rest,
      token: this.getJwtToken({ id: user.id }),
    }

  }

  async findOne( id: string ){
    let user: User;

    if( !isValidObjectId(id)){
      throw new BadRequestException('Invalid id provided')
    }

    user = await this.userModel.findById({ _id: id})

    if (!user){
      throw new NotFoundException( `User with id : ${id}, not found`)
    }

    return user;
  }

  getJwtToken(payload:JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }
}
