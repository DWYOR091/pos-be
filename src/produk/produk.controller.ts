import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProdukService } from './produk.service';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Injectuser } from 'src/decorator/inject-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadOption } from 'src/utils/file-upload.config';

@ApiTags('Produk')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('produk')
export class ProdukController {
  constructor(private readonly produkService: ProdukService) {}

  @Post()
  @ApiBody({ type: CreateProdukDto })
  @UseInterceptors(FileInterceptor('foto', fileUploadOption()))
  @ApiConsumes('multipart/form-data')
  async create(
    @Injectuser() createProdukDto: CreateProdukDto,
    @UploadedFile() foto: Express.Multer.File,
  ) {
    createProdukDto.foto = foto.filename;
    const result = await this.produkService.create(createProdukDto);

    return {
      messsage: 'produk berhasil dibuat',
      data: result,
    };
  }

  @Get()
  async findAll() {
    const result = await this.produkService.findAll();
    return {
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.produkService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProdukDto: UpdateProdukDto,
  ) {
    const result = await this.produkService.update(+id, updateProdukDto);
    return {
      msg: 'produk berhasil diupdate',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.produkService.remove(+id);
    return {
      message: 'Produk berhasil dihapus',
    };
  }
}
