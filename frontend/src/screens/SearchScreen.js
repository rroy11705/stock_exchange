import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import StockList from '../components/StockList'
import { listStocks } from '../actions/stocksAction'


export default function SearchScreen({ history }) {
    const dispatch = useDispatch()
    const stocksList = useSelector(state => state.stocksList)
    const { error, loading, stocks, page, pages } = stocksList

    let keyword = history.location.search
    const searchKey = keyword.split('?keyword=')[1].split('&')[0]

    useEffect(() => {
        dispatch(listStocks(keyword))

    }, [dispatch, keyword])

    return (
        <div>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            <Col>
                                <div className="py-5">
                                    <StockList title={`Stocks Search: ${searchKey}`} showAddToPortfolioButton={true} stocks={stocks} />
                                </div>
                            </Col>
                        </Row>
                        <Paginate page={page} pages={pages} keywords={keyword} link="search" extra={2} />
                    </div>
            }
        </div>
    )
}