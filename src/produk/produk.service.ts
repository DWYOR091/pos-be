import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produk } from './entities/produk.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdukService {
  constructor(
    @InjectRepository(Produk) private readonly produkRepo: Repository<Produk>,
  ) {}

  async create(createProdukDto: CreateProdukDto) {
    const findBarcode = this.produkRepo.findOne({
      where: { barcode: createProdukDto.barcode },
    });

    if (findBarcode)
      throw new HttpException(
        'barcode sudah digunakan',
        HttpStatus.BAD_REQUEST,
      );
    const result = await this.produkRepo.save(createProdukDto);
    // if (createProdukDto.barcode === result.barcode)
    //   throw new HttpException('barcode sudah ada', HttpStatus.BAD_REQUEST);
    return result;
  }

  findAll() {
    return this.produkRepo.find();
  }

  findOne(id: number) {
    const findId = this.produkRepo.findOne({ where: { id } });
    if (!findId)
      throw new HttpException('Id tidak ditemukan!', HttpStatus.BAD_REQUEST);
    return this.produkRepo.findOne({ where: { id } });
  }

  async update(id: number, updateProdukDto: UpdateProdukDto) {
    const findId = await this.produkRepo.findOne({ where: { id } });
    console.log(findId);
    if (!findId)
      throw new HttpException('Id tidak ditemukan!', HttpStatus.BAD_REQUEST);
    this.produkRepo.merge(findId, updateProdukDto);
    return await this.produkRepo.save(updateProdukDto);
  }

  remove(id: number) {
    const findId = this.produkRepo.findOne({ where: { id } });
    if (!findId)
      throw new HttpException('Id tidak ditemukan!', HttpStatus.BAD_REQUEST);
    return this.produkRepo.delete(id);
  }
}
