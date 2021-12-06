import  {TypeOf,object,string}  from "zod";

export const  createUserSchema = object({
    body: object({
        name: string({required_error: "Name is required"}),
        email: string({required_error: "Email is required"}).email( "Email is invalid"),
        password: string({required_error: "Password is required"}).min(6,"password must be at least 6 characters long"),
        passwordConfirmation: string({required_error: "Password is required"}).min(6,"confirmation password must be at least 6 characters long"),
    }).refine((data: any) => data.password === data.passwordConfirmation,{
        message: "Password and confirmation password does not match",
        path: ["passwordConfirmation"]
    })
});    

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">