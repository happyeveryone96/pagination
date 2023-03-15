# Pagination (inspired by [react-admin](https://github.com/marmelab/react-admin))

### 구현해야 할 것
1.`ListPaginationContextProvider`의 구현을 완성해야 합니다.

- ListPaginationContextProvider 에서 사용되는 상태값들은 다음과 같습니다.
    + totalPages: 전체 페이지 수
    + pageSize: 한 페이지에 보여줄 아이템의 수
    + currentPage: 현재 페이지
    + nextEnabled: 다음 페이지 버튼 활성화 여부
    + previousEnabled : 이전 페이지 버튼 활성화 여부
    + totalItems: 전체 아이템의 수 (전체 상품 수)
- ListPaginationContextProvider 에서 제공하는 함수들은 다음과 같습니다.
    + setNextPage: 다음 페이지 버튼을 클릭했을 때 동작하는 함수
    + setPrevPage: 이전 페이지 버튼을 클릭했을 때 동작하는 함수
    + setFirstPage: 첫번째 페이지로 이동하는 버튼을 클릭했을 때 동작하는 함수
    +`ListPaginationContextProvider` 컴포넌트의 children 들은 `usePaginationContext`를 통해 `ListPaginationContext`에 접근할 수 있어야 합니다.
    + props drilling을 피하기 위해 `ListPaginationContextProvider` 컴포넌트를 사용합니다.

2.`it.skip`에서 skip을 제거하고 테스트를 통과시켜야 합니다.
