import React from 'react';
import { create } from 'zustand';

type PaginationState = {
  totalItems: number;
  pageSize: number;
  currentPage: number;
};

type PaginationMeta = {
  totalPages: number;
  previousEnabled: boolean;
  nextEnabled: boolean;
};

type Pagination = PaginationState & PaginationMeta;
type PaginationArgs = Pick<PaginationState, 'totalItems' | 'pageSize'>;

const INITIAL_PAGE = 1;

export const usePaginationContext = create<{
  pagination: Pagination;
  setPagination: (pg: PaginationArgs) => void;
  setNextPage: () => void;
  setFirstPage: () => void;
  setPrevPage: () => void;
}>((set, get) => ({
  pagination: {
    totalPages: 0,
    pageSize: 0,
    currentPage: INITIAL_PAGE,
    nextEnabled: false,
    previousEnabled: false,
    totalItems: 0,
  },
  setPagination: (args: PaginationArgs) => {
    const totalPages = Math.ceil(args.totalItems / args.pageSize);
    const { totalItems, pageSize } = args;
    const currentPage = INITIAL_PAGE;
    const nextEnabled = currentPage < totalPages;
    const previousEnabled = currentPage > INITIAL_PAGE;

    set({
      pagination: {
        totalItems,
        pageSize,
        totalPages,
        currentPage,
        nextEnabled,
        previousEnabled,
      },
    });
  },
  setNextPage: () => {
    const { pagination } = get();
    const { currentPage, totalPages } = pagination;
    const nextEnabled = currentPage + 1 < totalPages;

    if (currentPage < totalPages) {
      set({
        pagination: {
          ...pagination,
          currentPage: currentPage + 1,
          nextEnabled,
          previousEnabled: true,
        },
      });
    }
  },
  setPrevPage: () => {
    const { pagination } = get();
    const { currentPage } = pagination;
    const previousEnabled = currentPage > 2;

    if (currentPage > INITIAL_PAGE) {
      set({
        pagination: {
          ...pagination,
          currentPage: currentPage - 1,
          nextEnabled: true,
          previousEnabled,
        },
      });
    }
  },
  setFirstPage: () => {
    const { pagination } = get();
    const { totalPages } = pagination;
    const nextEnabled = INITIAL_PAGE < totalPages;

    set({
      pagination: {
        ...pagination,
        currentPage: INITIAL_PAGE,
        nextEnabled,
        previousEnabled: false,
      },
    });
  },
}));

export interface ListContextProps {
  total: number;
  perPage: number;
}

type ListPaginationContextProps = ListContextProps;

const ListPaginationContextProvider: FCC<{ value: ListPaginationContextProps }> = ({ children, value }) => {
  const { setPagination } = usePaginationContext();
  React.useEffect(() => {
    setPagination({
      pageSize: value.perPage,
      totalItems: value.total,
    });
  }, [value]);

  return <>{children}</>;
};

export default ListPaginationContextProvider;
