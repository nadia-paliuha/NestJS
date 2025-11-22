import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TableService } from './table.service';
import { Table } from './table.entity';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  getAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Table> {
    return this.tableService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Table>, @Body('restaurantId') restaurantId: number): Promise<Table> {
    return this.tableService.create(data, restaurantId);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Table>): Promise<Table> {
    return this.tableService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.tableService.delete(id);
  }
}
