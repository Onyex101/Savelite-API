import { ApiModelProperty } from '@nestjs/swagger';

/**
 * DTO stands for Data Transfer Object
 */
export class CreateDto {
    @ApiModelProperty({
        type: String,
        description: 'user first name',
        required: true,
    })
    // tslint:disable-next-line: variable-name
    readonly first_name: string;

    @ApiModelProperty({
        type: String,
        description: 'user middle name',
        required: true,
    })
    // tslint:disable-next-line: variable-name
    readonly middle_name: string;

    @ApiModelProperty({
        type: String,
        description: 'user last name',
        required: true,
    })
    // tslint:disable-next-line: variable-name
    readonly last_name: string;

    @ApiModelProperty({
        type: String,
        description: 'unique username',
        required: true,
    })
    // tslint:disable-next-line: variable-name
    readonly user_name: string;

    @ApiModelProperty({
        type: String,
        description: 'user mobile number',
        required: true,
    })
    // tslint:disable-next-line: variable-name
    readonly phone_no: string;

    @ApiModelProperty({
        type: String,
        description: 'user email address',
        required: true,
    })
    readonly email: string;

    @ApiModelProperty({
        type: String,
        description: 'user password',
        required: true,
    })
    readonly password: string;
}

// tslint:disable-next-line: max-classes-per-file
export class LoginDto {

    @ApiModelProperty({
        type: String,
        description: 'username',
        required: true,
    })
    // tslint:disable-next-line: variable-name
    readonly user_name: string;

    @ApiModelProperty({
        type: String,
        description: 'user password',
        required: true,
    })
    readonly password: string;
}

// tslint:disable-next-line: max-classes-per-file
export class TokenDto {

    @ApiModelProperty({
        type: String,
        description: 'user request token',
        required: true,
    })
    readonly token: string;

}

// tslint:disable-next-line: max-classes-per-file
export class EmailResetDto {
    @ApiModelProperty({
        type: String,
        description: 'user mail address',
        required: true,
    })
    readonly email: string;
}

// tslint:disable-next-line: max-classes-per-file
export class PassResPageDto {
    @ApiModelProperty({
        type: String,
        description: 'user id',
        required: true,
    })
    readonly id: string;

    @ApiModelProperty({
        type: String,
        description: 'token',
        required: true,
    })
    readonly token: string;

    @ApiModelProperty({
        type: String,
        description: 'user password',
        required: true,
    })
    readonly password: string;
}

// tslint:disable-next-line: max-classes-per-file
export class CardDto {
    @ApiModelProperty({
        type: String,
        description: 'first name attached to card',
        required: true,
    })
    readonly firstname: string;

    @ApiModelProperty({
        type: String,
        description: 'last name attached to card',
        required: true,
    })
    readonly lastname: string;

    @ApiModelProperty({
        type: String,
        description: 'card expiry date',
        required: true,
    })
    // tslint:disable-next-line: variable-name
    readonly expiry_date: string;

    @ApiModelProperty({
        type: String,
        description: '15 digit card number',
        required: true,
    })
    // tslint:disable-next-line: variable-name
    readonly card_no: string;

    @ApiModelProperty({
        type: String,
        description: 'card 4 digit pin',
        required: true,
    })
    readonly pin: string;

    @ApiModelProperty({
        type: String,
        description: 'amount',
        required: true,
    })
    readonly amount: string;

    @ApiModelProperty({
        type: String,
        description: 'cvv',
        required: true,
    })
    readonly cvv: string;
}

// tslint:disable-next-line: max-classes-per-file
export class PlanDto {
    @ApiModelProperty({
        type: String,
        description: 'plan name',
        required: true,
    })
    readonly planName: string;

    @ApiModelProperty({
        type: String,
        description: 'periodic amount',
        required: true,
    })
    readonly periodicAmount: string;

    @ApiModelProperty({
        type: String,
        description: 'target amount',
        required: true,
    })
    readonly targetAmount: string;

    @ApiModelProperty({
        type: String,
        description: 'expected withdrawal date',
        required: true,
    })
    readonly withdrawalDate: string;

    @ApiModelProperty({
        type: String,
        description: 'withdrawal interval daily | weekly | monthly',
        required: true,
    })
    readonly duration: string;

    @ApiModelProperty({
        type: String,
        description: 'card details',
        required: true,
    })
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

    @ApiModelProperty({
        type: String,
        description: 'date of expense',
        required: true,
    })
    readonly date: string;

    @ApiModelProperty({
        type: Number,
        description: 'amount spent',
        required: true,
    })
    readonly amount: number;

    @ApiModelProperty({
        type: String,
        description: 'expense category',
        required: true,
    })
    readonly category: string;

    @ApiModelProperty({
        type: String,
        description: 'expense description',
        required: true,
    })
    readonly descr: string;

    @ApiModelProperty({
        type: String,
        description: 'remarks',
        required: true,
    })
    readonly remark: string;
}

// tslint:disable-next-line: max-classes-per-file
export class BudgetDto {

    @ApiModelProperty({
        type: String,
        description: 'budget name',
        required: true,
    })
    readonly budgetName: string;

    @ApiModelProperty({
        type: Number,
        description: 'budget amount',
        required: true,
    })
    readonly budget: number;

}

// tslint:disable-next-line: max-classes-per-file
export class ImageDto {

    @ApiModelProperty({
        type: String,
        description: 'image id',
        required: true,
    })
    readonly id: string;

    @ApiModelProperty({
        type: String,
        description: 'image name',
        required: true,
    })
    readonly name: string;

    @ApiModelProperty({
        type: Number,
        description: 'creation date',
        required: true,
    })
    readonly datetime: number;

    @ApiModelProperty({
        type: String,
        description: 'type',
        required: true,
    })
    readonly type: string;

    @ApiModelProperty({
        type: Number,
        description: 'width',
        required: true,
    })
    readonly width: number;

    @ApiModelProperty({
        type: Number,
        description: 'height',
        required: true,
    })
    readonly height: number;

    @ApiModelProperty({
        type: Number,
        description: 'size',
        required: true,
    })
    readonly size: number;

    @ApiModelProperty({
        type: String,
        description: 'delete hash',
        required: true,
    })
    readonly deletehash: string;

    @ApiModelProperty({
        type: String,
        description: 'url link',
        required: true,
    })
    readonly link: string;

}

// tslint:disable-next-line: max-classes-per-file
export class DeleteDto {

    @ApiModelProperty({
        type: String,
        description: 'image list to be deleted',
        required: true,
    })
    readonly images: ImageDto[];

    @ApiModelProperty({
        type: String,
        description: 'budget id',
        required: true,
    })
    readonly budgetId: string;

}

// tslint:disable-next-line: max-classes-per-file
export class ProfileUpdateDto {

    @ApiModelProperty()
    readonly type: string;

    @ApiModelProperty()
    readonly input: any;

}
