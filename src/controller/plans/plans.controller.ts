import { Controller, Get, Request, Post, UseGuards, Body, Response, NotImplementedException, Put, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlanService } from '../plans/plans.service';
import { PlanDto } from './../../dto/interface.dto';

@Controller('plan')
export class PlanController {
    constructor(
        private readonly planService: PlanService,
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createPlan(@Body() body: PlanDto, @Request() req) {
        try {
            return await this.planService.create(body, req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('card/:id')
    async getCard(@Request() req, @Param('id') id: string) {
        try {
            return await this.planService.getCard(id, req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async allPlans(@Request() req) {
        try {
            return await this.planService.allPlans(req.user);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updatePlan(@Param('id') id: string, @Body() body: PlanDto, @Request() req) {
        try {
            await this.planService.update(req.user, body, id);
            return {msg: 'update successful'};
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deletePlan(@Param('id') id: string, @Request() req) {
        try {
            await this.planService.delete(req.user, id);
            return {msg: 'plan deleted'};
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }
}
