import { db } from "@/lib/db";
import { ApiError, respon } from "@/types/api-respon";

export const getCategoryNameWithMostPeserta = async() =>{

    try {
        const categories = await db.category.findMany({
            include: {
            Lomba: {
                include: {
                peserta: true,
                },
            },
            },
        });

        const categoryWithPesertaCount = categories.map((category) => ({
            categoryName: category.categoryName,
            pesertaCount: category.Lomba.reduce((acc, lomba) => acc + lomba.peserta.length, 0),
        }));

        const mostPesertaCategory = categoryWithPesertaCount.reduce((prev, current) => (prev.pesertaCount > current.pesertaCount ? prev : current));

        return respon({
            code: 200,
            status: "success",
            msg: "jumlah peserta berdasar kategori berhasil di request",
            data: mostPesertaCategory.categoryName
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