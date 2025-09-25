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
import {
    AccessTokenPayload,
    RefreshTokenPayload,
} from 'src/common/types/auth.types';
import { AccessTokenGuard } from 'src/common/guard/access-token.guard';

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

    @ApiOkResponse()
    @UseGuards(AccessTokenGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Req() req: Request) {
        const user = req.user as AccessTokenPayload;
        const userId = user.sub;
        return this.authService.logout(userId);
    }
}
