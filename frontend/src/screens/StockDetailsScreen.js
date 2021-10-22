import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Button, ListGroup } from 'react-bootstrap'
import { FaRegStar } from "react-icons/fa"
import Loader from '../components/Loader'
import Message from '../components/Message'
import ModalForm from '../components/ModalForm'
import { listStockDetails } from '../actions/stocksAction'
import { getPortfolio, createPortfolioRecord } from '../actions/portfolioAction'

export default function StockDetailsScreen({ location, match }) {

    let history = useHistory()

    const [addModalShow, setAddModalShow] = useState(false)

    const dispatch = useDispatch()

    const stockDetailsList = useSelector(state => state.stockDetailsList)
    const { error, stock } = stockDetailsList

    const portfolioList = useSelector(state => state.portfolioList)
    const { loading, portfolios } = portfolioList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const prev = location.search ? location.search.split('?prev=')[1] : '/'

    useEffect(() => {
        dispatch(getPortfolio())
        dispatch(listStockDetails(match.params.id))
    }, [dispatch, match])

    const handelAddRecordInPortfolio = (e) => {
        const id = e.currentTarget.value
        let record = {
            symbol: stock.symbol,
            trade_date: new Date(),
            shares: 0,
            cost_per_share: 0,
            notes: ''
        }
        dispatch(createPortfolioRecord({ id: id, record: record }))
        history.push(`/portfolio/${id}/`)
    }

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
                                <Col sm={12} md={10}>
                                    <h4>{stock.name} ({ stock.symbol })</h4>
                                </Col>
                                {userInfo && 
                                    <Col sm={12} md={2}>
                                        <ModalForm
                                            show={addModalShow}
                                            size="sm"
                                            title="Choose Portfolio to add the stocks"
                                            body={
                                                (
                                                    <>
                                                        <div className="d-grid gap-2">
                                                            {portfolios.map(portfolio => (
                                                                <div key={portfolio.id}>
                                                                    <Button
                                                                        variant="link"
                                                                        value={portfolio.id}
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={handelAddRecordInPortfolio}>
                                                                        {portfolio.name}
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <Button className="mt-3 float-right" onClick={() => setAddModalShow(false)} variant="secondary">
                                                            Close
                                                        </Button>
                                                    </>
                                                )
                                            }
                                        />
                                        <Button
                                            variant="outline-info" 
                                            size="sm" 
                                            className="d-flex align-items-center"
                                            onClick={() => setAddModalShow(true)}>
                                            <FaRegStar size="1rem" className="mr-2" />  Add To Portfolio
                                        </Button>
                                    </Col>
                                }
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