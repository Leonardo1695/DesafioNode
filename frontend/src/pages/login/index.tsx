import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { AxiosError } from 'axios';
import { LoginType, loginSchema } from '../../validation/login.schema';
import { ValidationError } from 'yup';

const LoginComponent: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginType>({ email: "", password: "" })
    const { signIn, user } = useAuth()
    const { addToast } = useToast()
    

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setFormData(oldValue => {return { ...oldValue, [name]: value }})
    }

    const handleError = (error: unknown) => {
        let message: string | string[]
        if (error instanceof ValidationError) {
            message = error.errors.toString()
        }
        if (error instanceof AxiosError) {
            message = error.response?.data.message
        } else if (error instanceof Error) {
            message = error.message
        } else {
            message = 'ocorreu um erro'
        }
        addToast({ severity: 'error', detail: message });
    }

    const handleLogin = async () => {
        try {
            const data = await loginSchema.validate(formData);
            await signIn(data);
            addToast({ severity: 'info', detail: 'Seja bem vindo ' + user.name });
            navigate("/home")
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div className='container'>
            <h2>Faça login na plataforma</h2>

            <InputText style={{ marginBottom: 8 }} placeholder='digite seu email' name="email" value={formData.email} onChange={(e) => handleFormChange(e)} />

            <InputText style={{ marginBottom: 20 }} placeholder='digite sua senha' name="password" value={formData.password} onChange={(e) => handleFormChange(e)} />

            <Button label="Login" onClick={() => handleLogin()} icon="pi pi-check" />
        </div>
    )
}

export default LoginComponent;