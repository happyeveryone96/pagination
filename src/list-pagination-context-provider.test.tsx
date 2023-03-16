import * as React from 'react';
import expect from 'expect';
import { screen, render, fireEvent } from '@testing-library/react';
import ListPaginationContextProvider, { usePaginationContext } from './list-pagination-context-provider';

describe('ListPaginationContextProvider', () => {
  const NaiveList = () => {
    const { pagination, setNextPage, setPrevPage } = usePaginationContext();
    const { currentPage, totalPages, pageSize, nextEnabled, previousEnabled } = pagination;

    if (totalPages <= 0 || pageSize <= 0) return <>페이지 정보를 확인해주세요.</>;

    return (
      <div>
        <span>{`currentPage: ${currentPage}`}</span>
        <span>{`totalPages: ${totalPages}`}</span>
        <span>{`pageSize: ${pageSize}`}</span>
        {nextEnabled && <button onClick={setNextPage}>view more</button>}
        {previousEnabled && <button onClick={setPrevPage}>go to previous page</button>}
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
    expect(screen.queryByText('go to previous page')).toBeNull();
  });

  it('should return currentPage, totalPages, pageSize and view more button when the button is clicked', () => {
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
    expect(screen.getByText('go to previous page')).not.toBeNull();
    expect(screen.queryByText('view more')).toBeNull();
  });

  test('negative numbers', () => {
    render(
      <ListPaginationContextProvider
        value={{
          total: -4,
          perPage: -2,
        }}
      >
        <NaiveList />
      </ListPaginationContextProvider>,
    );

    expect(screen.getByText('페이지 정보를 확인해주세요.')).not.toBeNull();
  });

  test('middle page', () => {
    render(
      <ListPaginationContextProvider
        value={{
          total: 6,
          perPage: 2,
        }}
      >
        <NaiveList />
      </ListPaginationContextProvider>,
    );

    fireEvent.click(screen.getByText('view more'));

    expect(screen.getByText('view more')).not.toBeNull();
    expect(screen.getByText('go to previous page')).not.toBeNull();
  });
});
