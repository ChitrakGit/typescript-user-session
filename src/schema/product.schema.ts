import {object,string, TypeOf } from 'zod';
const payload = {
    body: object({
        title: string({required_error: 'title is required',}),
        product: string({required_error: 'product is required'}),
        description: string({required_error: 'des is required'}).min(10,'description should be least 10 characters long'),
        price: string({required_error: 'price is required'}),
        image: string({required_error: 'image is required'}),
    })
    }

const params = {
    params: object({
        productId: string({required_error: 'productId is required'}),
    })
}


export const createProductSchema = object({
    ...payload
})

export const findProductSchema = object({
    ...params
})

export const updateProductSchema = object({
    ...params
})


export const deleteProductSchema = object({
    ...params
})

export type createProductInput = TypeOf<typeof createProductSchema>;
export type findProductInput = TypeOf<typeof findProductSchema>;
export type deleteProductInput = TypeOf<typeof deleteProductSchema>;
export type updateProductInput = TypeOf<typeof updateProductSchema>;
