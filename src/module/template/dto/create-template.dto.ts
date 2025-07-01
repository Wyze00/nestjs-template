import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTemplateDto {
    @ApiProperty({
        type: String,
        example: 'Dummy1',
        minLength: 1,
        maxLength: 10,
    })
    @IsString()
    @Length(1, 10)
    username: string;
}
