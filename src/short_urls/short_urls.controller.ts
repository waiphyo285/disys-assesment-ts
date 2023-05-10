import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Put,
  Delete,
  Param,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ShortUrlsService } from './short_urls.service';
import { ShortUrlDto } from './dto/short-url.dto';
import { EXPIRED } from '../helpers/constant';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiBearerAuth()
@Controller('short-urls')
export class ShortUrlsController {
  constructor(private service: ShortUrlsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getALl(@Res() res: Response) {
    const result = await this.service.getList();
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: result });
  }

  @Get(':code')
  async getOne(@Param('code') code: string, @Res() res: Response) {
    try {
      const result = await this.service.getDataByCode(code);

      if (result === null) throw new NotFoundException();

      if (result === EXPIRED) throw new UnauthorizedException();

      result.hitCount += 1;

      const updated = await this.service.updateData(result);

      res.redirect(result.fullUrl);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: ShortUrlDto, @Res() res: Response) {
    const result = await this.service.createData(data);
    res.status(HttpStatus.CREATED).json({ status: HttpStatus.CREATED });
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(@Body() data: ShortUrlDto, @Res() res: Response) {
    const result = await this.service.updateData(data);
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteData(@Param('id') id: number, @Res() res: Response) {
    const result = await this.service.deleteData(id);
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK });
  }
}
