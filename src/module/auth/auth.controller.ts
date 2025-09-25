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
import { LoginRequestDto } from './dto/login-request.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TokenResponseDto } from './dto/token-response.dto';
import { RefreshTokenGuard } from 'src/common/guard/refresh-token.guard';
import { Request } from 'express';
import { RefreshTokenPayload } from 'src/common/types/auth.types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOkResponse({
        type: TokenResponseDto,
    })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginRequestDto): Promise<TokenResponseDto> {
        return this.authService.login(loginDto);
    }

    @ApiOkResponse({
        type: TokenResponseDto,
    })
    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@Req() req: Request): Promise<TokenResponseDto> {
        const user = req.user as RefreshTokenPayload;
        const userId: string = user.sub;
        const refreshToken: string = user.refreshToken;
        return this.authService.refreshToken(userId, refreshToken);
    }
}
