import * as React from 'react';
import expect from 'expect';
import { screen, render, fireEvent } from '@testing-library/react';
import ListPaginationContextProvider, { usePaginationContext } from './list-pagination-context-provider';

describe('ListPaginationContextProvider', () => {
  const NaiveList = () => {
    const { pagination, setNextPage } = usePaginationContext();

    return (
      <div>
        <span>{`currentPage: ${pagination.currentPage}`}</span>
        <span>{`totalPages: ${pagination.totalPages}`}</span>
        <span>{`pageSize: ${pagination.pageSize}`}</span>
        {pagination.nextEnabled && <button onClick={setNextPage}>view more</button>}
      </div>
    );
  };
  it('should return currentPage, totalPages, pageSize and view more button', () => {
    render(
      <ListPaginationContextProvider
        value={{
          total: 4,
          perPage: 2,
        }}
      >
        <NaiveList />
      </ListPaginationContextProvider>,
    );

    expect(screen.getByText('currentPage: 1')).not.toBeNull();
    expect(screen.getByText('totalPages: 2')).not.toBeNull();
    expect(screen.getByText('pageSize: 2')).not.toBeNull();
    expect(screen.getByText('view more')).not.toBeNull();
  });

  it('when the button is clicked, should return currentPage, totalPages, pageSize and view more button', () => {
    render(
      <ListPaginationContextProvider
        value={{
          total: 4,
          perPage: 2,
        }}
      >
        <NaiveList />
      </ListPaginationContextProvider>,
    );

    fireEvent.click(screen.getByText('view more'));

    expect(screen.getByText('currentPage: 2')).not.toBeNull();
    expect(screen.getByText('totalPages: 2')).not.toBeNull();
    expect(screen.getByText('pageSize: 2')).not.toBeNull();
    expect(screen.queryByText('view more')).toBeNull();
  });
});
