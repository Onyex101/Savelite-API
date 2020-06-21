import { Controller, Get, Request, Post, UseGuards, Body, Response, NotImplementedException, Put, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExpenseDto, BudgetDto, ImageDto } from './../../dto/interface.dto';
import { ExpenseService } from './expense.service';
import { ApiUseTags, ApiOkResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiUseTags('expense')
@Controller('expense')
export class ExpenseController {

    constructor(
        private readonly expService: ExpenseService,
    ) { }

    /**
     * gets all created budgets
     * @param id budget id
     * @param req request info
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('budgets')
    @ApiOkResponse({description: 'The resource has been succesfully returned'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async allBudget(@Param('id') id: string, @Request() req) {
        try {
            return await this.expService.allBudget(req.user, id);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    /**
     * create new budget
     * @param req request info
     * @param body budget data
     */
    @UseGuards(AuthGuard('jwt'))
    @Post('budget')
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async newBudget(@Request() req, @Body() body: BudgetDto) {
        try {
            return await this.expService.setBudget(body, req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    /**
     * delete a budget
     * @param body budget data
     * @param req request info
     */
    @UseGuards(AuthGuard('jwt'))
    @Post('del-budget')
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async removeBudget(@Body() body: any, @Request() req) {
        try {
            return await this.expService.removeBudget(req.user, body);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    /**
     * add an expense to the current budget
     * @param id budget id
     * @param req request info
     * @param body body data
     */
    @UseGuards(AuthGuard('jwt'))
    @Post(':id')
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async addExpense(@Param('id') id: string, @Request() req, @Body() body: ExpenseDto) {
        try {
            return await this.expService.addExpense(body, req.user, id);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    /**
     * edit expense
     * @param bId budget id
     * @param id expense id
     * @param req request info
     * @param body expense details
     */
    @UseGuards(AuthGuard('jwt'))
    @Post(':bId/:id')
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async editExpense(@Param('bId') bId: string, @Param('id') id: string, @Request() req, @Body() body: ExpenseDto) {
        try {
            return await this.expService.editExpense(bId, body, req.user, id);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    /**
     * delete expense from a budget
     * @param bId budget id
     * @param id expense id
     * @param req request info
     */
    @UseGuards(AuthGuard('jwt'))
    @Delete(':bId/:id')
    @ApiCreatedResponse({description: 'The resource has successfully been deleted'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async deleteExpense(@Param('bId') bId: string, @Param('id') id: string, @Request() req) {
        try {
            return await this.expService.delExpense(bId, id, req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    /**
     * edit budget
     * @param id busget id
     * @param body budget detils
     * @param req request info
     */
    @UseGuards(AuthGuard('jwt'))
    @Post('budget/edit/:id')
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async editBudget(@Param('id') id: string, @Body() body: BudgetDto, @Request() req) {
        try {
            return await this.expService.editBudget(body, req.user, id);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    /**
     * adds an image url to budget data
     * @param id budget id
     * @param body image details
     * @param req request info
     */
    @UseGuards(AuthGuard('jwt'))
    @Post('budget/image/:id')
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async saveImage(@Param('id') id: string, @Body() body: ImageDto, @Request() req) {
        try {
            return await this.expService.addImage(id, body, req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    /**
     * remove image url from budget details
     * @param bId budget id
     * @param id image id
     * @param req request info
     */
    @UseGuards(AuthGuard('jwt'))
    @Delete('budget/image/:bId/:id')
    @ApiCreatedResponse({description: 'The resource has successfully been deleted'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async deleteImage(@Param('bId') bId: string, @Param('id') id: string, @Request() req) {
        try {
            return await this.expService.delImage(bId, id, req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

}
