import { ApiModelProperty } from '@nestjs/swagger';

export class CreateListingDto {
  @ApiModelProperty({ description: 'Title of the listing', required: true })
  readonly name: string;

  @ApiModelProperty({ description: 'Description and more information', required: false })
  readonly description?: string;
}
