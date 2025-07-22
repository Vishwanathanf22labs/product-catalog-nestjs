import { ApiProperty } from '@nestjs/swagger'

export class CreateRatingDto {
  @ApiProperty({
    example: 'user-uuid-string',
    description: 'ID of the user giving the rating'
  })
  user_id: string

  @ApiProperty({
    example: 4.5,
    description: 'Rating value (e.g., between 1 and 5)'
  })
  value: number
} 