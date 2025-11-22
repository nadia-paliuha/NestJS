import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { TableService } from './table.service';
import { Table } from './table.entity';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  getAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  getOne(@Param('id') id: number): Promise<Table> {
    return this.tableService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() data: Partial<Table>, @Body('restaurantId') restaurantId: number): Promise<Table> {
    return this.tableService.create(data, restaurantId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: number, @Body() data: Partial<Table>): Promise<Table> {
    return this.tableService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  delete(@Param('id') id: number): Promise<void> {
    return this.tableService.delete(id);
  }
}
