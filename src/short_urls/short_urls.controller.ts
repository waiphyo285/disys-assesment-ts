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
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ShortUrlsService } from './short_urls.service';
import { ShortUrlDto } from './dto/short-url.dto';
import { EXPIRED } from '../helpers/constant';

@Controller('short-urls')
export class ShortUrlsController {
  constructor(private service: ShortUrlsService) {}

  @Get()
  async getALl(@Res() res: Response) {
    const result = await this.service.getList();
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: result });
  }

  @Get(':code')
  async getOne(@Param() params, @Res() res: Response) {
    try {
      const result = await this.service.getDataByCode(params.code);

      if (result === null) throw new NotFoundException();

      if (result === EXPIRED) throw new UnauthorizedException();

      result.hitCount += 1;

      const updated = await this.service.updateData(result);

      res.redirect(result.fullUrl);
    } catch (err) {
      throw err;
    }
  }

  @Post()
  async create(@Body() data: ShortUrlDto, @Res() res: Response) {
    const result = await this.service.createData(data);
    res.status(HttpStatus.CREATED).json({ status: HttpStatus.CREATED });
  }

  @Put()
  async update(@Body() data: ShortUrlDto, @Res() res: Response) {
    const result = await this.service.updateData(data);
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK });
  }

  @Delete(':id')
  async deleteData(@Param() params, @Res() res: Response) {
    const result = await this.service.deleteData(params);
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK });
  }
}
