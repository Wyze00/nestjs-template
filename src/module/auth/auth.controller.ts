import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
    Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { TokenDto } from './dto/token.dto';
import { RefreshTokenGuard } from 'src/common/guard/refresh-token.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/common/types/jwt-payload.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<TokenDto> {
        return this.authService.login(loginDto);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@Req() req: Request): Promise<TokenDto> {
        const user = req.user as JwtPayload;
        const userId: string = user.sub;
        const refreshToken: string = user.refreshToken!;
        return this.authService.refreshToken(userId, refreshToken);
    }
}
