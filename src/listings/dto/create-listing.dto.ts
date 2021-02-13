import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateListingDto {
  @IsString()
  @ApiModelProperty({ description: 'Title of the listing', required: true })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({ description: 'Description and more information', required: false })
  readonly description?: string;
}
