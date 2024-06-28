'use server'

import { z } from 'zod';
import { FormDataLomba } from "@/components/ui/lomba-form";
import { GenerateDynamicSchemaByPos, LombaSchema } from "@/lib/formSchema";
import { ApiError, respon } from "@/types/api-respon";
import { db } from '@/lib/db';
import { uuidv7 } from 'uuidv7';

export const addLomba = async (formData: FormDataLomba) => {
    // Generate the dynamic schema with the correct jumlahPos
    const jumlahPos = formData.jumlahPos;
    const dynamicSchema = GenerateDynamicSchemaByPos(jumlahPos);

    // Validate the formData with the dynamic schema
    const validateValues = await dynamicSchema.safeParseAsync(formData);

    try {
        if (!validateValues.success) {
            throw new ApiError({
                code: 400,
                status: "error",
                data: null,
                msg: "Invalid fields...!"
            });
        }

        const {
            lombaName,
            isRegister,
            isStartSet,
            startAt,
            isAgeSet,
            minAge,
            maxAge,
            jenisKelamin,
            jumlahPos,
            pos,
            isFinish,
        } = validateValues.data

        const action = await db.lomba.create({
            data:{
                id: uuidv7(),
                lombaName,
                genre: jenisKelamin,
                isRegister,
                isDateSet: isStartSet,
                startAt,
                isAgeSet,
                minAge,
                maxAge,
                pos:{
                    createMany:{
                        data: pos.map((item)=>({
                            id: uuidv7(),
                            posName: item.value,
                            isPosFinish: item.name === isFinish
                        }))
                    }
                }
            }
        })

        // Proceed with your logic here
        return respon({
            code: 201,
            status: "success",
            data: action,
            msg: "Berhasil menambahkan lomba baru",
        });
    } catch (error) {
        throw new ApiError({
            code: 500,
            status: "error",
            msg: "An error occurred while getting lomba name",
            data: null
        });
    }
}
