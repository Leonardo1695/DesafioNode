import React from 'react';
import { Container } from './styles';

interface PaginationProps {
    page: number,
    size: number,
    totalRecords: number,
    itemsOnCurrentPage: number,
    pageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, size, totalRecords, itemsOnCurrentPage, pageChange }) => {
    const pageNumbers: number[] = [];
    const pagesShowing: number[] = [];

    for (let i = 1; i <= Math.ceil(totalRecords / size); i++) {
        pageNumbers.push(i);
    }

    for (let j = 0; j < pageNumbers.length; j++){
        const numberPlus = page === 1 ? 4 : page === 2 ? 3 : 2;
        const numberMinus = page === pageNumbers.length ? 4 : page === pageNumbers.length - 1 ? 3 : 2;
        if (pageNumbers[j] >= page - numberMinus && pageNumbers[j] <= page + numberPlus) {
            pagesShowing.push(pageNumbers[j])
        }
    }

    return (
        <Container>
            <nav>
                <div className="count">
                    itens: {itemsOnCurrentPage}
                </div>
                <ul>
                    <li className="first">
                        <button onClick={() => pageChange(1)} className={page === 1 ? 'hide' : ''}><i className="pi pi-angle-double-left"></i></button>
                    </li>
                    <li className="prev">
                        <button onClick={() => pageChange(page - 1)} className={page === 1 ? 'hide' : ''}><i className="pi pi-angle-left"></i></button>
                    </li>
                    {pagesShowing.map(number => (
                    <li key={number} className='page-item'>
                        <button onClick={() => pageChange(number)} className={'page-link ' + (number === page ? 'active' : '') }>
                            {number}
                        </button>
                    </li>
                    ))}
                    <li className="next">
                        <button onClick={() => pageChange(page + 1)} className={page === pageNumbers.length ? 'hide' : ''}><i className="pi pi-angle-right"></i></button>
                    </li>
                    <li className="last">
                        <button onClick={() => pageChange(pageNumbers.length)} className={page === pageNumbers.length ? 'hide' : ''}><i className="pi pi-angle-double-right"></i></button>
                    </li>
                </ul>
                <div className="count">
                    total: {totalRecords}
                </div>
            </nav>
        </Container>
    );
}

export default Pagination;
