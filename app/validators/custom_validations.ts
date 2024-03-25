import vine from "@vinejs/vine";
import { FieldContext } from '@vinejs/vine/types'

async function legalAgeValidation(
    value: unknown,
    options: any,
    field: FieldContext
) {

    if (typeof value !== 'object') {
        return
    }

    if (value === null) return

    const MINIMUM_AGE = 18;

    const birthdate = new Date(value.toString());
    const birthdateYear = birthdate.getFullYear()
    const birthdateMonth = birthdate.getMonth() + 1
    const birthdateDate = birthdate.getDate()

    const currentDate = new Date();
    const currentDateYear = currentDate.getFullYear()
    const currentDateMonth = currentDate.getMonth() + 1
    const currentDateDate = currentDate.getDate()

    let edad = currentDateYear - birthdateYear;

    if (
        birthdateMonth > currentDateMonth ||
        (birthdateMonth === currentDateMonth && birthdateDate > currentDateDate)
    ) {
        edad--;
    }

    if (edad <= MINIMUM_AGE) {
        field.report(
            'The {{ field }} field must be of a user over 18 years of age',
            'legalAge',
            field
        )
    }

    return
}

export const legalAgeValidationRule = vine.createRule(legalAgeValidation)
