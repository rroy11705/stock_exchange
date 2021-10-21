import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import StockList from '../components/StockList'
import { listStocksTopLosers } from '../actions/stocksAction'
import { useHistory } from 'react-router-dom'

export default function TopLosersScreen() {

    const dispatch = useDispatch()
    const stocksTopLosersList = useSelector(state => state.stocksTopLosersList)

    let history = useHistory()

    let keyword = history.location.search

    useEffect(() => {
        dispatch(listStocksTopLosers(keyword))

    }, [dispatch, keyword])

    return (
        <>
            <Row>
                <Col>
                    {stocksTopLosersList.loading ? <Loader />
                        : stocksTopLosersList.error ? <Message variant='danger'>{stocksTopLosersList.error}</Message>
                            :
                            <div className="py-5">
                                <StockList title={`Stocks: Losers (Top ${stocksTopLosersList.stocks.total})`} showAddToPortfolioButton={true} stocks={stocksTopLosersList.stocks.stocks} />
                                <Paginate page={stocksTopLosersList.stocks.page} pages={stocksTopLosersList.stocks.pages} link="top-losers" keywords={keyword} extra={2} />
                            </div>
                    }
                </Col>
            </Row>
        </>
    )
}
