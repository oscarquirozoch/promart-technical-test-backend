import vine from '@vinejs/vine'
import { legalAgeValidationRule } from './custom_validations.js'

export const listClientsValidator = vine.compile(
    vine.object({
        id: vine
            .string()
            .trim()
            .nullable(),
        name: vine
            .string()
            .trim()
            .maxLength(40)
            .nullable(),
        surname: vine
            .string()
            .trim()
            .maxLength(40)
            .nullable(),
        page: vine
            .number()
            .positive(),
        per_page: vine
            .number()
            .positive()
    })
)

export const createClientValidator = vine.compile(
    vine.object({
        name: vine
            .string()
            .trim()
            .maxLength(40),
        surname: vine
            .string()
            .trim()
            .maxLength(40),
        mothers_surname: vine
            .string()
            .trim()
            .maxLength(40)
            .nullable(),
        email: vine
            .string()
            .trim()
            .email(),
        birthdate: vine
            .date()
            .use(
                legalAgeValidationRule()
            )
    })
)

export const updateClientValidator = vine.compile(
    vine.object({
        name: vine
            .string()
            .trim()
            .maxLength(40)
            .optional(),
        surname: vine
            .string()
            .trim()
            .maxLength(40)
            .optional(),
        mothers_surname: vine
            .string()
            .trim()
            .maxLength(40)
            .optional(),
        email: vine
            .string()
            .trim()
            .email()
            .optional(),
        birthdate: vine
            .date()
            .use(
                legalAgeValidationRule()
            )
            .optional()
    })
)