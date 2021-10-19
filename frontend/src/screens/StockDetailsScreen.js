import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listStockDetails } from '../actions/stocksAction'

export default function StockDetailsScreen({ location, match }) {

    const dispatch = useDispatch()

    const stockDetailsList = useSelector(state => state.stockDetailsList)
    const { loading, error, stock } = stockDetailsList

    const prev = location.search ? location.search.split('?prev=')[1] : '/'

    useEffect(() => {
        dispatch(listStockDetails(match.params.id))

    }, [dispatch, match])

    return (
        <div>
            <Link to={prev} className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col>
                                    <h4>{stock.name} ({ stock.symbol })</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h2>
                                        {stock.price}
                                        <small className={stock.change_amount > 0 ? "text-success" : "text-danger"}>
                                            {stock.change_amount > 0 ? "+" + stock.change_amount : stock.change_amount}
                                        </small>
                                        <small className={stock.change_percent > 0 ? "text-success" : "text-danger"}>
                                            ({stock.change_percent > 0 ? "+" + stock.change_percent + "%" : stock.change_percent + "%"})
                                        </small>
                                    </h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <div>Previous Close</div>
                                            <div>{stock.prev_close_value ? stock.prev_close_value : "N/A"}</div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <div>Open</div>
                                            <div>{stock.open_value ? stock.open_value : "N/A"}</div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <div>Bid</div>
                                            <div>{stock.bid_value ? stock.bid_value : "N/A"} X {stock.bid_quantity ? stock.bid_quantity : "N/A"}</div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <div>Ask</div>
                                            <div>{stock.ask_value ? stock.ask_value : "N/A"} X {stock.ask_quantity ? stock.ask_quantity : "N/A"}</div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <div>Day's Range</div>
                                            <div>{stock.days_low ? stock.days_low : "N/A"} - {stock.days_high ? stock.days_high : "N/A"}</div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <div>Day's Range</div>
                                            <div>{stock.fifty_two_week_low ? stock.fifty_two_week_low : "N/A"} - {stock.fifty_two_week_high ? stock.fifty_two_week_high : "N/A"}</div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={6}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <div>Volume</div>
                                            <div>{stock.volume ? stock.volume : "N/A"}</div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <div>Avg. Volume</div>
                                            <div>{stock.avg_volume ? stock.avg_volume : "N/A"}</div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <div>Market Cap</div>
                                            <div>{stock.market_cap ? stock.market_cap : "N/A"}</div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <div>PE Ratio</div>
                                            <div>{stock.pe_ratio ? stock.pe_ratio : "N/A"}</div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <div>EPS Ratio</div>
                                            <div>{stock.eps_ratio ? stock.eps_ratio : "N/A"}</div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <div>Forward Dividend & Yield</div>
                                            <div>{stock.forward_dividend_yield ? stock.forward_dividend_yield : "N/A"}</div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    )

            }


        </div >
    )
}