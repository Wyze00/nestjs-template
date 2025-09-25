import {
    Injectable,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/provider/prisma.service';
import { LoginRequestDto } from './dto/login-request.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TokenResponseDto } from './dto/token-response.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async login(LoginRequestDto: LoginRequestDto): Promise<TokenResponseDto> {
        const { id, password } = LoginRequestDto;

        const user: User | null = await this.prismaService.user.findUnique({
            where: { id },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = await this.generateTokens(user.id);
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }

    async refreshToken(
        userId: string,
        refreshToken: string,
    ): Promise<TokenResponseDto> {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        });

        if (!user || !user.refreshToken) {
            throw new ForbiddenException('Access Denied');
        }

        const isRefreshTokenMatching = await bcrypt.compare(
            refreshToken,
            user.refreshToken,
        );

        if (!isRefreshTokenMatching) {
            throw new ForbiddenException('Access Denied');
        }

        const tokens = await this.generateTokens(user.id);
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }

    private async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.prismaService.user.update({
            where: { id: userId },
            data: { refreshToken: hashedRefreshToken },
        });
    }

    private async generateTokens(userId: string): Promise<TokenResponseDto> {
        const payload = { sub: userId };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);

        return { accessToken, refreshToken };
    }

    async logout(userId: string): Promise<boolean> {
        await this.prismaService.user.updateMany({
            where: {
                id: userId,
                refreshToken: {
                    not: null,
                },
            },
            data: {
                refreshToken: null,
            },
        });
        return true;
    }
}
