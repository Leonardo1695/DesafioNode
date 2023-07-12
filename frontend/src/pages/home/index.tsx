import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "primereact/button"
import { DataTable} from 'primereact/datatable';
import { Fieldset } from 'primereact/fieldset';
import { Column } from 'primereact/column';
import { RevenueFilter, useRevenue, Revenue, FinancialPost } from '../../hooks/revenue';
import { useToast } from '../../hooks/toast';
import { ValidationError } from 'yup';
import { AxiosError } from 'axios';
import Pagination from '../../components/Pagination';

// import { Container } from './styles';

const startOfToday = new Date();
//startOfToday.setDate(9);
startOfToday.setUTCHours(0,0,0,0);

const endOfToday = new Date();
//endOfToday.setDate(9);
endOfToday.setUTCHours(23,59,59,999);

const HomeComponent: React.FC = () => {
    const [revenue, setRevenue] = useState<Revenue>()
    const [revenueFilter, setRevenueFilter] = useState<RevenueFilter>({ startDate: startOfToday.toISOString(), endDate: endOfToday.toISOString(), itemsPerPage: 2, page: 1 })
    const navigate = useNavigate();
    const { addToast } = useToast()
    const { getRevenue, deleteFinancialPost } = useRevenue()
    const [loading, setLoading] = useState(true)

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

    const loadRevenue = async (filter: RevenueFilter) => {
        try {
            setLoading(true)
            const data = await getRevenue(filter)
            setRevenue(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            handleError(error)
        }
        
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteFinancialPost(id)
            loadRevenue(revenueFilter)
            addToast({ severity: 'info', detail: 'lançamento deletado com sucesso' });
        } catch (error) {
            handleError(error)
        }
        
    }

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatDate = (value: Date) => {
        return value.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const typeBodyTemplate = (item: FinancialPost) => {
        if (item.type === 'income') {
            return 'Receita'
        } else {
            return 'Despesa'
        }
    };

    const amountBodyTemplate = (item: FinancialPost) => {
        return formatCurrency(item.amount);
    };

    const dateBodyTemplate = (item: FinancialPost) => {
        return formatDate(new Date(item.createdAt));
    };

    const actionsBodyTemplate = (item: FinancialPost) => {
        return <Button onClick={() => handleDelete(item.id)} icon="pi pi-times" rounded raised />
    };

    const handlePageChange = (page: number) => {
        const newFilter = { ...revenueFilter, page };
        loadRevenue(newFilter);
        setRevenueFilter(newFilter);
    }

    useEffect(() => {
        loadRevenue(revenueFilter)
    },[])

    const header = (
        <div className="table-header">
            <span className="text-xl text-900 font-bold">Lançamentos do Dia</span>
            <Button onClick={() => loadRevenue(revenueFilter)} icon="pi pi-refresh" rounded raised />
        </div>
    );

    return (
        <div className='container'>
            {revenue && !loading && (
                <>
                <Fieldset className='header' legend="Lançamentos">
                    <p>
                        Balanço do dia: { formatCurrency(revenue.totalAmount) }
                    </p>
                    <p>
                        total de Lançamentos: { revenue?.totalElements }
                    </p>
                    <div className="card">
                        <DataTable 
                            header={header} 
                            value={revenue.financialPosts}
                            scrollable 
                            scrollHeight="400px"
                            tableStyle={{ minWidth: '50rem' }}
                        >
                            <Column field="description" header="Descrição"></Column>
                            <Column field="type" body={typeBodyTemplate} header="Tipo"></Column>
                            <Column field="amount" body={amountBodyTemplate} header="Valor"></Column>
                            <Column field="createdAt" dataType="date" body={dateBodyTemplate} header="Criado em"></Column>
                            <Column body={actionsBodyTemplate} header="Deletar"></Column>
                        </DataTable>
                    </div>
                    <Pagination
                        page={revenueFilter.page}
                        size={revenueFilter.itemsPerPage}
                        totalRecords={revenue.totalElements}
                        itemsOnCurrentPage={revenue.financialPosts.length}
                        pageChange={(pageNumber) => handlePageChange(pageNumber)}
                    />
                </Fieldset>
                
                </>
            )}
            <Button className='button' label="Criar lançamento" onClick={() => navigate("/lancamento")} icon="pi pi-plus" />
            <Button className='button' label="Voltar para login" onClick={() => navigate("/")} icon="pi pi-backward" />
        </div>
    )
}

export default HomeComponent;