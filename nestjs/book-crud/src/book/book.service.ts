import { Injectable } from '@nestjs/common';
import { Book } from './book.model';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  private books: Book[] = [];
  private idCounter = 1;

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  create(dto: CreateBookDto): Book {
    const newBook = { id: this.idCounter++, ...dto };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, dto: UpdateBookDto): Book | undefined {
    const book = this.findOne(id);
    if (book) {
      Object.assign(book, dto);
    }
    return book;
  }

  remove(id: number): boolean {
    const index = this.books.findIndex((book) => book.id === id);
    if (index >= 0) {
      this.books.splice(index, 1);
      return true;
    }
    return false;
  }
}
