import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { createFinancialPostSchema, createFinancialPostType } from '../../validation/create-financial-post.schema';
import { FinancialPostTypeEnum } from '../../enum/financial-post-type.enum';
import { useToast } from '../../hooks/toast';
import { ValidationError } from 'yup';
import { AxiosError } from 'axios';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useRevenue } from '../../hooks/revenue';
import { SelectItem } from 'primereact/selectitem';

const FinancialPostComponent: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<createFinancialPostType>({ description: "", amount: 0, type: FinancialPostTypeEnum.INCOME })
    const { createFinancialPost } = useRevenue()
    const dropdownTypes: SelectItem[] = [{ label: 'Entrada', value: 'income' }, { label: 'Saída', value: 'expense' }]
    const { addToast } = useToast()
    

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement> | InputNumberValueChangeEvent | DropdownChangeEvent) => {
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

    const handleCreate = async () => {
        try {
            const data = await createFinancialPostSchema.validate(formData);
            await createFinancialPost(data)
            addToast({ severity: 'info', detail: 'lançamento criado com sucesso' });
            navigate("/home")
        } catch (error) {
            handleError(error)
        }
    }

    const footer = (
        <div className='form-actions'>
            <Button style={{ marginRight: '1rem' }} className='button' label="Cadastrar" onClick={() => handleCreate()} icon="pi pi-check" />

            <Button className='button' label="Voltar" onClick={() => navigate("/home")} icon="pi pi-backward" />
        </div>
    );

    return (
        <div className='container'>
            <Card title="Cadastro de Lançamento" footer={footer}>
                <div className='content'>
                    <InputText style={{ marginBottom: 8 }} placeholder='descrição' name="description" value={formData.description} onChange={(e) => handleFormChange(e)} />

                    <InputNumber style={{ marginBottom: 8 }} placeholder='valor' inputId="currency-br" name='amount' value={formData.amount} onValueChange={(e) => handleFormChange(e)} mode="currency" currency="BRL" locale="pt-BR" />

                    <Dropdown value={formData.type} name='type' onChange={(e) => handleFormChange(e)} options={dropdownTypes}
                    placeholder="selecione um tipo" className="w-full md:w-14rem" />
                </div>
            </Card>
        </div>
    )
}

export default FinancialPostComponent;