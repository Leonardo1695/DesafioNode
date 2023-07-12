import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { AxiosError } from 'axios';
import { loginSchema } from '../../validation/login.schema';
import { ValidationError } from 'yup';
import { Input } from 'recomponentsui';
import { FiGithub, FiMail, FiLock } from 'react-icons/fi';

interface LoginType {
    email: string,
    password: string,
    terms: boolean
}

const LoginComponent: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginType>({ email: "", password: "", terms: false })
    const { signIn, user } = useAuth()
    const { addToast } = useToast()

    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFormData(oldValue => {
            const retorno =  { ...oldValue, [name]: checked }; 
            return retorno
        })
        
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        
        setFormData(oldValue => {
            const retorno =  { ...oldValue, [name]: value }; 
            return retorno
        })
        
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
            <h2 style={{ color: '#000', marginBottom: 8 }}>Faça login na plataforma</h2>

            <Input 
                type='email'
                containerStyle={{ marginBottom: 8 }} 
                placeholder='digite seu email' 
                icon={FiMail} 
                minLength={3} 
                name="email"
                value={formData.email}
                onChange={(e) => handleFormChange(e)} 
                required
            />

            <Input 
                type='password'
                containerStyle={{ marginBottom: 20 }} 
                placeholder='digite sua senha' 
                icon={FiLock} 
                minLength={3} 
                name="password"
                value={formData.password}
                onChange={(e) => handleFormChange(e)} 
                required
            />

            <Input 
                type='checkbox'
                containerStyle={{ marginBottom: 20 }} 
                placeholder='aceita os termos ?' 
                icon={FiGithub} 
                minLength={3} 
                name="terms"
                checked={formData.terms}
                onChange={(e) => handleCheckChange(e)} 
                required
            />

            <Button style={{ marginBottom: 8 }}  label="Login" onClick={() => handleLogin()} icon="pi pi-check" />

            <Button style={{ backgroundColor: 'red' }} label="Limpar" onClick={() => setFormData({ email: "", password: "", terms: false  })} icon="pi pi-check" />
        </div>
    )
}

export default LoginComponent;