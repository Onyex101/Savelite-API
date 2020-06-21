import { Controller, Get, Request, Post, UseGuards, Body, Response, NotImplementedException, Put, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlanService } from '../plans/plans.service';
import { PlanDto } from './../../dto/interface.dto';
import { ApiUseTags, ApiOkResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiUseTags('plan')
@Controller('plan')
export class PlanController {
    constructor(
        private readonly planService: PlanService,
    ) { }

    /**
     * creates a new plan
     * @param body plan info
     * @param req request info
     */
    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async createPlan(@Body() body: PlanDto, @Request() req) {
        try {
            return await this.planService.create(body, req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    /**
     * retrieves card details
     * @param req request info
     * @param id plan id
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('card/:id')
    @ApiOkResponse({description: 'The resource has been succesfully returned'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async getCard(@Request() req, @Param('id') id: string) {
        try {
            return await this.planService.getCard(id, req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    /**
     * retrieves all plans
     * @param req request info
     */
    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiOkResponse({description: 'The resource has been succesfully returned'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async allPlans(@Request() req) {
        try {
            return await this.planService.allPlans(req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    /**
     * update plan
     * @param id plan id
     * @param body plan info to be updated
     * @param req request info
     */
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async updatePlan(@Param('id') id: string, @Body() body: PlanDto, @Request() req) {
        try {
            await this.planService.update(req.user, body, id);
            return {msg: 'update successful'};
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    /**
     * delete plan
     * @param id plan id
     * @param req request info
     */
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @ApiCreatedResponse({description: 'The resource has successfully been deleted'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async deletePlan(@Param('id') id: string, @Request() req) {
        try {
            await this.planService.delete(req.user, id);
            return {msg: 'plan deleted'};
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }
}
