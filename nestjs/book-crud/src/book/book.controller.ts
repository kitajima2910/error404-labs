import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.bookService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { deleted: boolean } {
    return { deleted: this.bookService.remove(Number(id)) };
  }
}
