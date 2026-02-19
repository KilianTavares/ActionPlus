import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDTO, signUpDTO } from './auth-dto';

@Injectable()
export class AuthService {
  // In production, inject UserRepository/Database service here
  // constructor(private readonly userRepository: UserRepository) {}

  async validateUser(email: string, password: string): Promise<any> {
    // TODO: Query database for user by email
    // TODO: Compare hashed password using bcrypt
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: loginDTO): Promise<any> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    // TODO Generate JWT
    // const token = this.jwtService.sign({sub:user.id, email: user.email});

    return {
      success: true,
      user,
      // token
      message: 'login successful',
    };
  }

  async signUp(signUpDto: signUpDTO) {
    // TODO: Check if user already exists
    const existingUser = await this.findUserByEmail(signUpDto.email);

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    // TODO: Hash password
    // const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    // TODO: Save to database
    const newUser = {
      id: Math.random().toString(36).substring(2, 9), // Generate proper UUID
      email: signUpDto.email,
      fullName: signUpDto.fullName,
      // password: hashedPassword,
      phoneNumber: signUpDto.phoneNumber,

      createdAt: new Date(),
    };

    return {
      success: true,
      user: newUser,
      message: 'User created successfully',
    };
  }
  private async findUserByEmail(email: string): Promise<any> {
    // TODO: Replace with actual database query
    // return this.userRepository.findOne({ where: { email } });
    return null;
  }
}
