
import * as z from 'zod'

export const VALIDATE_MESSAGES = {
    REQUIRED: "Harus diisi",
    OPTION_REQUIRED: "Wajib pilih salah satu",
    POS_MIN: (count: number) => `Minimal ${count} pos`,
    UNIQUE: "Tidak boleh sama",
    START_DATE_REQUIRED: "Tentukan tanggal mulai",
    DATE_FORMAT: "Format tanggal salah",
    AGE_POSITIVE: "harus berupa angka positif",
    AGE_MIN: "Minimal 2 tahun",
    JML_POS_MIN: "Minimal 1 pos",
    JML_POS_MAX: "Maksimal 10 Pos",
    IS_BIGGER: "Harus Min < Max",
    IS_SMALLER: "Harus Max > Min",
    WRONG_FORMAT: "Format email tidak valid",
    EXIST: "Sudah ada.."
}

export const LoginSchema = z.object({
    username: z.string().min(1, {
        message: "Username tidak boleh kosong"
    }),
    password: z.string().min(1, {
        message: "Password tidak boleh kosong"
    })
})

export const ResetPasswordSchema = z.object({
    email: z.string()
        .min(1, "Email tidak boleh kosong" )
        .email("Email tidak valid"),
})

export const RegisterpSchema =  z.object({
    name: z
        .string()
        .min(1, "Name tidak boleh kosong"),
    username: z
        .string()
        .min(1, "username boleh kosong"),
    email: z
        .string()
        .min(1, "Email tidak boleh kosong" )
        .email("Email tidak valid"),
    password: z
        .string()
        .min(6, {
            message: "Password minimal 6 karakter"
        })
})

export const CategorySchema = z.object({
    categoryName: z
        .string()
        .min(1, "Kategori tidak boleh kosong")
})

export const JenisKelaminSchema = z.enum(["Pria", "Wanita", "Gabungan"], {
    message: "Jenis kelamin wajib ditentukan",
})


export const jenisKelaminOption = JenisKelaminSchema.options

export const LombaSchema = z
    .object({
        lombaName: z
            .string()
            .min(1, VALIDATE_MESSAGES.REQUIRED),
        isRegister: z
            .boolean(),
        isStartSet: z
            .boolean(),
        startAt: z
            .date({ message: VALIDATE_MESSAGES.DATE_FORMAT }),
        isAgeSet: z
            .boolean(),
        minAge: z
            .number({ message: VALIDATE_MESSAGES.AGE_POSITIVE })
            .min(2, VALIDATE_MESSAGES.AGE_MIN),
        maxAge: z
            .number({ message: VALIDATE_MESSAGES.AGE_POSITIVE })
            .min(2, VALIDATE_MESSAGES.AGE_MIN),
        jenisKelamin: JenisKelaminSchema,
        jumlahPos: z
            .number({ message: VALIDATE_MESSAGES.AGE_POSITIVE })
            .min(1, VALIDATE_MESSAGES.JML_POS_MIN)
            .max(10, VALIDATE_MESSAGES.JML_POS_MAX),
    })

export const PosOption = (jumlahPos: number) =>{
    const enumValue = Array.from({ length: jumlahPos }, (_, index) => `pos.${index}`) as [string, ...string[]];
    const schema = z.enum(enumValue, { message: VALIDATE_MESSAGES.OPTION_REQUIRED })

    return schema
}

export const GenerateDynamicSchemaByPos = (jumlahPos: number) => {
    const posArraySchema = z.array(
        z.object({
            name:z.string().optional(),
            value: z.string().min(1, VALIDATE_MESSAGES.REQUIRED),
        })
    ).length(jumlahPos, VALIDATE_MESSAGES.POS_MIN(jumlahPos));

    const isFinishEnumValues = PosOption(jumlahPos)

    const combinedSchema = LombaSchema.extend({
        pos: posArraySchema,
        isFinish: isFinishEnumValues
    })
    .refine(data => {
        if (data.isStartSet) {
            return data.startAt !== undefined;
        }
        return true;
    }, {
        message: VALIDATE_MESSAGES.START_DATE_REQUIRED,
        path: ['startAt'],
    })
    .superRefine((data, ctx) => {

        const posValues = data.pos.map(pos => pos.value);
        const valueOccurrences = posValues.reduce((acc, value, index) => {
            if (!acc[value]) {
                acc[value] = [];
            }
            acc[value].push(index);
            return acc;
        }, {} as Record<string, number[]>);

        Object.values(valueOccurrences).forEach(indices => {
            if (indices.length > 1) {
                indices.forEach(index => {
                    ctx.addIssue({
                        code: "custom",
                        path: ['pos', index, 'value'],
                        message: VALIDATE_MESSAGES.UNIQUE,
                    })
                })
            }
        })
    })
    
    
    return combinedSchema;
}




// export const GenerateDynamicSchemaByPos = (jumlahPos: number) => {
//     const PosSchema = z
//         .object({
//             pos: z
//                 .array(z
//                     .object({
//                         name:z.string().optional(),
//                         value: z.string().min(1, VALIDATE_MESSAGES.REQUIRED),
//                     }))
//                 .length(jumlahPos, VALIDATE_MESSAGES.POS_MIN(jumlahPos)),

//             isFinish: PosOption(jumlahPos)
//         })
//         .refine((data) => {
//             if(data.isStartSet){
//                 return data.startAt !== undefined
//             }

//             return true

//         }, {
//             message: VALIDATE_MESSAGES.START_DATE_REQUIRED,
//             path: ['startAt'],
//         })
//         .superRefine((data, ctx) => {

//             const posValues = data.pos.map(pos => pos.value);
//             const valueOccurrences = posValues.reduce((acc, value, index) => {
//                 if (!acc[value]) {
//                     acc[value] = [];
//                 }
//                 acc[value].push(index);
//                 return acc;
//             }, {} as Record<string, number[]>);

//             Object.values(valueOccurrences).forEach(indices => {
//                 if (indices.length > 1) {
//                     indices.forEach(index => {
//                         ctx.addIssue({
//                             code: "custom",
//                             path: ['pos', index, 'value'],
//                             message: VALIDATE_MESSAGES.UNIQUE,
//                         })
//                     })
//                 }
//             })
//         })
    
//     const combineSchema = LombaSchema
//     .extend(PosSchema)
//     return combineSchema;
// }