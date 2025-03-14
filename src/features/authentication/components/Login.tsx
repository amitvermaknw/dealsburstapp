'use client';

import { useEffect, useState, useTransition } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAdminContext } from "../hooks/useAdminContext";
import Alert from "../../../components/ui/Alert";
import { toast } from 'react-toastify';
import SignInWithGoogle from "./SignInWithGoogle";
import { useRouter } from "next/navigation";
import * as z from 'zod';

const schema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Password is required." })
});

type FormData = z.infer<typeof schema>;
type Errors = Record<keyof FormData, string[]>;

const Login = () => {
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
    });
    const [error, setError] = useState<Partial<Errors>>({});
    const auth = useAdminContext();
    const navigate = useRouter()


    const validation = () => {
        const result = schema.safeParse(formData);
        if (!result.success) {
            const newError = result.error.flatten().fieldErrors;
            setError(newError);
            return false;
        }

        setError({})
        return true;
    }

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validation()) return;
        startTransition(async () => {
            const response = await auth.loginAction(formData);
            if (response.code) {
                setFormData({ email: "", password: "" })
            }
        });

    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token)
            navigate.push("/dashboard");
    }, [])

    return (
        <div className="flex flex-row min-h-96 justify-center items-center ">
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex-auto">
                <div className="px-6 py-4">
                    <h1 className="font-bold text-md- md-2">Login</h1>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <form onSubmit={handleSubmit}>
                        <Input
                            name="email"
                            onChange={handleInput}
                            placeholder="Please enter email"
                            type="text"
                            label="User Name"
                        />
                        {error.email ? <Alert danger={error.email[0]} /> : ''}
                        <Input
                            name="password"
                            onChange={handleInput}
                            placeholder="Please enter password"
                            type="password"
                            label="Password"
                        />
                        {error.password ? <Alert danger={error.password[0]} /> : ''}

                        <Button
                            name="Login"
                            onClick={(event) => { handleSubmit(event) }}
                            loading={isPending}
                        />
                    </form>
                </div>
                {auth.alertMsg && (<div className="px-6 py-4">
                    {toast(auth.alertMsg)}
                </div>)}
                {/* <SignInWithGoogle /> */}
            </div>

        </div>
    )
}

export default Login