import { Module } from '@nestjs/common';
import { ProdukService } from './produk.service';
import { ProdukController } from './produk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produk } from './entities/produk.entity';
import { UniqueValidator } from 'src/validators/unique-validator';

@Module({
  imports: [TypeOrmModule.forFeature([Produk])],
  controllers: [ProdukController],
  providers: [ProdukService, UniqueValidator],
})
export class ProdukModule {}
