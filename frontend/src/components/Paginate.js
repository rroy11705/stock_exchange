import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, keyword = '', extra }) {
    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    const page_lower_index = Math.max((page - 1) - (extra / 2), 0)
    const page_upper_index = Math.min((page - 1) + (extra / 2), pages - 1)

    return (pages > 1 && (
        <Pagination>

            {page > 1 && (
                    <>
                        <LinkContainer
                            key="prev"
                            to={`/?keyword=${keyword}&page=${1}`}
                        >
                            <Pagination.Item>First</Pagination.Item>
                        </LinkContainer>
                        <LinkContainer
                            key="prev"
                            to={`/?keyword=${keyword}&page=${page - 1}`}
                        >
                            <Pagination.Item>Prev</Pagination.Item>
                        </LinkContainer>
                    </>
                )
            }

            {[...Array(page_upper_index - page_lower_index + 1)
            .fill()
            .map((x, i) => page_lower_index + i)
            ]
                .map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={`/?keyword=${keyword}&page=${x + 1}`}
                >
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}

            <LinkContainer
                key="prev"
                to={`/?keyword=${keyword}&page=${page + 1}`}
            >
                <Pagination.Item>Next</Pagination.Item>
            </LinkContainer>

            <LinkContainer
                key="prev"
                to={`/?keyword=${keyword}&page=${pages}`}
            >
                <Pagination.Item>Last</Pagination.Item>
            </LinkContainer>

        </Pagination>
    )
    )
}

export default Paginate