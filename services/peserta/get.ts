import { db } from "@/lib/db"
import { ApiError, respon } from "@/types/api-respon"

export const getPesertaCount = async() =>{
    try {
        const pesertaCount = await db.peserta.count()
        console.log({pesertaCount})
        return respon({
            code: 200,
            status: "success",
            msg: "Total panita berhasil di request",
            data: pesertaCount
        })
    } catch (error) {
        respon({
            code: 500,
            status: "error",
            msg: "An error occurred while retrieving users",
            data: null
        })
    }
}

export const getMostPesertaByCategory = async() =>{
    try {
        const categories = await db.category.findMany({
            include:{
                Lomba:{
                    include:{
                        peserta: true
                    }
                }
            }
        })

        const categoryWithPesertaCount = categories.map((category) => ({
            categoryName: category.categoryName,
            pesertaCount: category.Lomba.reduce((acc, lomba) => acc + lomba.peserta.length, 0),
        }));

        const mostPesertaCategory = categoryWithPesertaCount.reduce((prev, current) => (prev.pesertaCount > current.pesertaCount ? prev : current));

        return respon({
            code: 200,
            status: "success",
            msg: "jumlah peserta berdasar kategori berhasil di request",
            data: mostPesertaCategory
        })
    } catch (error) {
        respon({
            code: 500,
            status: "error",
            msg: "An error occurred while retrieving category",
            data: null
        })
    }
    
}

export const getBestWaktuInCategory = async() =>{
    try {
        const categories = await db.category.findMany({
            include: {
                Lomba: {
                    include: {
                        peserta: true,
                    },
                },
            },
        })

        const categoryBestWaktu = categories.map((category) => {
            const pesertaTimes = category.Lomba.flatMap((lomba) => lomba.peserta.map((peserta) => peserta.waktu));
            const bestWaktu = pesertaTimes.reduce((min, waktu) => (waktu && (!min || waktu < min) ? waktu : min), null);

            return {
                categoryName: category.categoryName,
                bestWaktu,
            }
        })

        return respon({
            code: 200,
            status: "success",
            msg: "best time kategori berhasil di request",
            data: categoryBestWaktu
        })

    } catch (error) {
        respon({
            code: 500,
            status: "error",
            msg: "An error occurred while retrieving category",
            data: null
        })
    }
   
}