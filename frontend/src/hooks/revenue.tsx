import React, { createContext, useContext, PropsWithChildren } from 'react';
import api from '../services/api';
import { FinancialPostTypeEnum } from '../enum/financial-post-type.enum';
import { createFinancialPostType } from '../validation/create-financial-post.schema';
import { AxiosResponse } from 'axios';

export interface RevenueFilter {
  startDate: string;
  endDate: string;
  page: number;
  itemsPerPage: number;
}

export interface FinancialPost {
  id: string;
  description: string;
  amount: number;
  type: FinancialPostTypeEnum;
  userId: string;
  createdAt: string;
}

export interface Revenue {
  startDate: string;
  endDate: string;
  financialPosts: FinancialPost[];
  totalAmount: number;
  totalElements: number;
}

interface RevenueContextData {
  getRevenue: (filter: RevenueFilter) => Promise<Revenue>
  createFinancialPost: (data: createFinancialPostType) => Promise<FinancialPost>
  deleteFinancialPost: (id: string) => Promise<void>
}

const RevenueContext = createContext<RevenueContextData>({} as RevenueContextData);

const RevenueProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const getRevenue = async (filter: RevenueFilter): Promise<Revenue> => {
    const response = await api.get<any, AxiosResponse<Revenue>>('revenue', {
      params: filter
  })

    return response.data
  };

  const createFinancialPost = async (data: createFinancialPostType): Promise<FinancialPost> => {
    const response = await api.post<any, AxiosResponse<FinancialPost>>('/financial-post/new', data)

    return response.data
  }

  const deleteFinancialPost = async (id: string): Promise<void> => {
    await api.delete(`/financial-post/${id}`)

    return
  }

  return (
    <RevenueContext.Provider value={{ getRevenue, createFinancialPost, deleteFinancialPost }}>
      {children}
    </RevenueContext.Provider>
  )
};

function useRevenue(): RevenueContextData {
  const context = useContext(RevenueContext);

  if (!context) {
    throw new Error('useRevenue must be used within an RevenueProvider');
  }

  return context;
}

export { RevenueProvider, useRevenue };
