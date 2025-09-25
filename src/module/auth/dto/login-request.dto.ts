import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
    @ApiProperty({
        type: String,
        example: '11111',
    })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        type: String,
        example: 's3cr3t',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
