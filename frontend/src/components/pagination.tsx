import { Nav, Pagination } from "react-bootstrap";

interface PaginationProps {
    page: number,
    setPage: (page : number) => void,
    pageNumber: number,
}

export default function Paginate({
    page,
    setPage,
    pageNumber,
    }: PaginationProps) {
    return (
        <Nav>
        <Pagination style={{ margin: "auto",paddingTop:"8px" }}>
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}
          />
          {Array.from({ length: pageNumber }, (_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === page}
              onClick={() => {
                setPage(i + 1);
              }}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={page === pageNumber}
            onClick={() => {
              setPage(page + 1);
            }}
          />
        </Pagination>
      </Nav>
    )
}