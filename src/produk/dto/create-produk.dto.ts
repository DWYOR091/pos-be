import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class ProdukDto {
  @IsNumber()
  id: number;

  @ApiProperty({ example: '123456789' })
  // @IsUnique([Produk, 'barcode'])
  @IsString()
  barcode: string;

  @ApiProperty({ example: 'sabun' })
  @IsString()
  nama_produk: string;

  @ApiProperty({ example: 'sabun untuk mandi' })
  @IsString()
  deskripsi_produk: string;

  @ApiProperty({ example: 2000 })
  @IsNumber()
  harga_beli: number;

  @ApiProperty({ example: 3000 })
  @IsNumber()
  harga_jual: number;

  @ApiProperty({ format: 'binary' })
  @IsString()
  @IsOptional()
  foto: string;

  @IsObject()
  user;
}

//buang idnya saja
export class CreateProdukDto extends OmitType(ProdukDto, ['id']) {}
//ambil idnya saja
export class ProdukIdDto extends PickType(ProdukDto, ['id']) {}
