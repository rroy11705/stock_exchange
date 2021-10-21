import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import StockList from '../components/StockList'
import { listStocksTopLosers, listStocksTopGainers } from '../actions/stocksAction'

export default function HomeScreen() {

    const dispatch = useDispatch()
    const stocksTopLosersList = useSelector(state => state.stocksTopLosersList)

    const stocksTopGainersList = useSelector(state => state.stocksTopGainersList)

    useEffect(() => {
        dispatch(listStocksTopGainers())
        dispatch(listStocksTopLosers())

    }, [dispatch])

    return (
        <>
            <Row>
                {(stocksTopLosersList.loading && stocksTopGainersList.loading) ? <Loader /> 
                    :
                    (
                        <>
                            <Col sm={12} md={6}>
                                {stocksTopGainersList.error ? <Message variant='danger'>{stocksTopGainersList.error}</Message>
                                        :
                                        <div className="py-5">
                                            <StockList title="Stocks: Gainers" seeMoreLink="top-gainers"ink="top-gainers" stocks={stocksTopGainersList.stocks.stocks?.slice(0, 5)} />
                                        </div>
                                }
                            </Col>
                            <Col sm={12} md={6}>
                                {stocksTopLosersList.error ? <Message variant='danger'>{stocksTopLosersList.error}</Message>
                                    :
                                    <div className="py-5">
                                        <StockList title="Stocks: Losers" seeMoreLink="top-losers" stocks={stocksTopLosersList.stocks.stocks?.slice(0, 5)} />
                                    </div>
                                }
                            </Col>
                        </>
                    )
                }
            </Row>
        </>
    )
}
