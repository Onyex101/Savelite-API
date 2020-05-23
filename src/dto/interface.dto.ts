import { ApiModelProperty } from '@nestjs/swagger';

/**
 * DTO stands for Data Transfer Object
 */
export class CreateDto {
    @ApiModelProperty()
    // tslint:disable-next-line: variable-name
    readonly first_name: string;

    @ApiModelProperty()
    // tslint:disable-next-line: variable-name
    readonly middle_name: string;

    @ApiModelProperty()
    // tslint:disable-next-line: variable-name
    readonly last_name: string;

    @ApiModelProperty()
    // tslint:disable-next-line: variable-name
    readonly user_name: string;

    @ApiModelProperty()
    // tslint:disable-next-line: variable-name
    readonly phone_no: string;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;
}

// tslint:disable-next-line: max-classes-per-file
export class LoginDto {

    @ApiModelProperty()
    // tslint:disable-next-line: variable-name
    readonly user_name: string;

    @ApiModelProperty()
    readonly password: string;
}

// tslint:disable-next-line: max-classes-per-file
export class TokenDto {

    @ApiModelProperty()
    readonly token: string;

}

// tslint:disable-next-line: max-classes-per-file
export class EmailResetDto {
    @ApiModelProperty()
    readonly email: string;
}

// tslint:disable-next-line: max-classes-per-file
export class PassResPageDto {
    @ApiModelProperty()
    readonly id: string;

    @ApiModelProperty()
    readonly token: string;

    @ApiModelProperty()
    readonly password: string;
}

// tslint:disable-next-line: max-classes-per-file
export class CardDto {
    @ApiModelProperty()
    readonly firstname: string;

    @ApiModelProperty()
    readonly lastname: string;

    @ApiModelProperty()
    // tslint:disable-next-line: variable-name
    readonly expiry_date: string;

    @ApiModelProperty()
    // tslint:disable-next-line: variable-name
    readonly card_no: string;

    @ApiModelProperty()
    readonly pin: string;

    @ApiModelProperty()
    readonly amount: string;

    @ApiModelProperty()
    readonly cvv: string;
}

// tslint:disable-next-line: max-classes-per-file
export class PlanDto {
    @ApiModelProperty()
    readonly planName: string;

    @ApiModelProperty()
    readonly periodicAmount: string;

    @ApiModelProperty()
    readonly targetAmount: string;

    @ApiModelProperty()
    readonly withdrawalDate: string;

    @ApiModelProperty()
    readonly duration: string;

    @ApiModelProperty()
    readonly card: {
        readonly firstname: string;

        readonly lastname: string;

        readonly expiry_date: string;

        readonly card_no: string;

        readonly pin: string;

        readonly amount: string;

        readonly cvv: string;
    };
}

// tslint:disable-next-line: max-classes-per-file
export class ExpenseDto {

    @ApiModelProperty()
    readonly date: string;

    @ApiModelProperty()
    readonly amount: number;

    @ApiModelProperty()
    readonly category: string;

    @ApiModelProperty()
    readonly descr: string;

    @ApiModelProperty()
    readonly remark: string;
}

// tslint:disable-next-line: max-classes-per-file
export class BudgetDto {

    @ApiModelProperty()
    readonly budgetName: string;

    @ApiModelProperty()
    readonly budget: number;

}

// tslint:disable-next-line: max-classes-per-file
export class ImageDto {

    @ApiModelProperty()
    readonly id: string;

    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty()
    readonly datetime: number;

    @ApiModelProperty()
    readonly type: string;

    @ApiModelProperty()
    readonly width: number;

    @ApiModelProperty()
    readonly height: number;

    @ApiModelProperty()
    readonly size: number;

    @ApiModelProperty()
    readonly deletehash: string;

    @ApiModelProperty()
    readonly link: string;

}

// tslint:disable-next-line: max-classes-per-file
export class DeleteDto {

    @ApiModelProperty()
    readonly images: ImageDto[];

    @ApiModelProperty()
    readonly budgetId: string;

}

// tslint:disable-next-line: max-classes-per-file
export class ProfileUpdateDto {

    @ApiModelProperty()
    readonly type: string;

    @ApiModelProperty()
    readonly input: any;

}
