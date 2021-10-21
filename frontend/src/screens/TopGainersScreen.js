import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import StockList from '../components/StockList'
import { listStocksTopGainers } from '../actions/stocksAction'
import { useHistory } from 'react-router-dom'

export default function TopGainersScreen() {

    const dispatch = useDispatch()
    const stocksTopGainersList = useSelector(state => state.stocksTopGainersList)

    let history = useHistory()

    let keyword = history.location.search

    useEffect(() => {
        dispatch(listStocksTopGainers(keyword))

    }, [dispatch, keyword])

    return (
        <>
            <Row>
                <Col>
                    {stocksTopGainersList.loading ? <Loader />
                        : stocksTopGainersList.error ? <Message variant='danger'>{stocksTopGainersList.error}</Message>
                            :
                            <div className="py-5">
                                <StockList title={`Stocks: Gainers (Top ${stocksTopGainersList.stocks.total})`} showAddToPortfolioButton={true} stocks={stocksTopGainersList.stocks.stocks} />
                                <Paginate page={stocksTopGainersList.stocks.page} pages={stocksTopGainersList.stocks.pages} link="top-gainers" keywords={keyword} extra={2} />
                            </div>
                    }
                </Col>
            </Row>
        </>
    )
}
