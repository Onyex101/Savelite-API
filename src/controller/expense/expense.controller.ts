import { Controller, Get, Request, Post, UseGuards, Body, Response, NotImplementedException, Put, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExpenseDto, BudgetDto, ImageDto } from './../../dto/interface.dto';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {

    constructor(
        private readonly expService: ExpenseService,
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('budgets')
    async allBudget(@Param('id') id: string, @Request() req) {
        try {
            return await this.expService.allBudget(req.user, id);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('budget')
    async newBudget(@Request() req, @Body() body: BudgetDto) {
        try {
            return await this.expService.setBudget(body, req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('del-budget')
    async removeBudget(@Body() body: any, @Request() req) {
        try {
            return await this.expService.removeBudget(req.user, body);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id')
    async addExpense(@Param('id') id: string, @Request() req, @Body() body: ExpenseDto) {
        try {
            return await this.expService.addExpense(body, req.user, id);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':bId/:id')
    async editExpense(@Param('bId') bId: string, @Param('id') id: string, @Request() req, @Body() body: ExpenseDto) {
        try {
            return await this.expService.editExpense(bId, body, req.user, id);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':bId/:id')
    async deleteExpense(@Param('bId') bId: string, @Param('id') id: string, @Request() req) {
        try {
            return await this.expService.delExpense(bId, id, req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('budget/edit/:id')
    async editBudget(@Param('id') id: string, @Body() body: BudgetDto, @Request() req) {
        try {
            return await this.expService.editBudget(body, req.user, id);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('budget/image/:id')
    async saveImage(@Param('id') id: string, @Body() body: ImageDto, @Request() req) {
        try {
            return await this.expService.addImage(id, body, req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('budget/image/:bId/:id')
    async deleteImage(@Param('bId') bId: string, @Param('id') id: string, @Request() req) {
        try {
            return await this.expService.delImage(bId, id, req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

}
