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
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RequestWithUser } from 'src/common/type/request-with-user';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<TokenDto> {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtGuard) // Asumsikan Anda memiliki RefreshTokenGuard
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@Req() req: RequestWithUser) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const userId = req.user['sub'];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const refreshToken = req.user['refreshToken']; // Ini akan diatur oleh guard
        return this.authService.refreshToken(userId, refreshToken);
    }
}
