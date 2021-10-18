import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import { listStocks } from '../actions/stocksAction'
import { useHistory } from 'react-router-dom'

export default function HomeScreen() {

    const dispatch = useDispatch()
    const stocksList = useSelector(state => state.stocksList)
    const { error, loading, stocks, page, pages } = stocksList

    let history = useHistory()

    let keyword = history.location.search

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
                            {stocks.map(stock => (
                                <Col key={stock.symbol} sm={12} md={6} lg={4} xl={3}>
                                    {stock.name}
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword} extra={6} />
                    </div>
            }
        </div>
    )
}
