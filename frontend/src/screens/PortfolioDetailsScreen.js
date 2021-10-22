import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form, Table, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker"
import Loader from '../components/Loader'
import ColoredCodecNumber from '../components/ColoredCodecNumber'
import Message from '../components/Message'
import ModalForm from '../components/ModalForm'
import { getPortfolioDetails, createPortfolioRecord, updatePortfolioRecord, deletePortfolioRecord } from '../actions/portfolioAction'
import { listStocks } from '../actions/stocksAction'

export default function PortfolioDetailsScreen({ location, history, match }) {

    const [createModalShow, setCreateModalShow] = useState(false)
    const [updateModalShow, setUpdateModalShow] = useState(false)
    
    const symbolInputRef = useRef()
    const symbolSelectRef = useRef()
    const [searchStocks, setSearchStocks] = useState([])

    const [selectedRecord, setSelectedRecord] = useState("")

    const [symbol, setSymbol] = useState('')
    const [tradeDate, setTradeDate] = useState(new Date())
    const today = new Date()
    const [shares, setShares] = useState(0)
    const [costPerShares, setCostPerShares] = useState(0)
    const [notes, setNotes] = useState('')

    const dispatch = useDispatch()
    const portfolioDetails = useSelector(state => state.portfolioDetails)
    const { error, loading, portfolio } = portfolioDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const stocksList = useSelector(state => state.stocksList)

    const prev = location.search ? location.search.split('?prev=')[1] : '/'
    const path = history.location.search ? history.location.pathname + history.location.search : history.location.pathname

    useEffect(() => {
        if (!userInfo)
            history.push('/login')

        dispatch(getPortfolioDetails(match.params.id))
    }, [userInfo, match])

    const handelCreateRecordSubmit = (e) => {
        e.preventDefault()
        let record = {
            symbol: symbol,
            trade_date: tradeDate,
            shares: shares,
            cost_per_share: costPerShares,
            notes: notes
        }
        dispatch(createPortfolioRecord({id: match.params.id, record: record}))
        setCreateModalShow(false)
        setSymbol('')
        setTradeDate(today)
        setShares('')
        setCostPerShares('')
        setNotes('')
    }

    const handelUpdateRecordSubmit = (e) => {
        e.preventDefault()
        let record = {
            symbol: symbol,
            trade_date: tradeDate,
            shares: shares,
            cost_per_share: costPerShares,
            notes: notes
        }
        console.log({ id: selectedRecord, record: record })
        dispatch(updatePortfolioRecord({ id: selectedRecord, record: record }))
        setUpdateModalShow(false)
        setSymbol('')
        setTradeDate(today)
        setShares('')
        setCostPerShares('')
        setNotes('')
    }

    const handelDeleteRecord = (e) => {
        e.preventDefault()
        dispatch(deletePortfolioRecord(e.target.value))
    }

    const handelSearchSymbols = (e) => {
        symbolSelectRef.current.style.display = "flex"
        dispatch(listStocks(`?keyword=${e.target.value}`))
        setSearchStocks(stocksList.stocks.slice(0, 5))
    }

    if (loading)
        return <Loader />
    return (
        <>
            <Link to={prev} className='btn btn-light my-3'>Go Back</Link>
            {error ? <Message variant='danger'>{error}</Message>
                :
                (
                    <>
                        <ModalForm
                            show={createModalShow}
                            title="Create New Record"
                            body={
                                (
                                    <Form onSubmit={handelCreateRecordSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Stock Symbol</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Search Stock Symbol / Name"
                                                ref={symbolInputRef}
                                                onChange={handelSearchSymbols}
                                            />
                                            <ListGroup ref={symbolSelectRef} style={{ position: "absolute", width: "calc(100% - 32px)", boxShadow: "0px 1px 5px 0px #00000044", zIndex: 1 }}>
                                                {searchStocks.map(stock => (
                                                    <ListGroup.Item 
                                                        key={stock.symbol}
                                                        value={stock.symbol}
                                                        style={{ cursor: "pointer" }}
                                                        onClick={(e) => {
                                                            symbolInputRef.current.value = stock.symbol;
                                                            setSymbol(stock.symbol)
                                                            symbolSelectRef.current.style.display = "none"
                                                        }}>
                                                        {stock.name} ({stock.symbol})
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Trading Date</Form.Label>
                                            <DatePicker
                                                selected={tradeDate}
                                                onChange={(e) => {
                                                    setTradeDate(e);
                                                }}
                                                className="form-control"
                                                maxDate={today}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Shares</Form.Label>
                                            <Form.Control
                                                type="number"
                                                step="any"
                                                placeholder="Shares"
                                                value={shares}
                                                onChange={(e) => setShares(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Cost Per Share</Form.Label>
                                            <Form.Control
                                                type="number"
                                                step="any"
                                                placeholder="Cost Per Share"
                                                value={costPerShares}
                                                onChange={(e) => setCostPerShares(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Notes</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Notes"
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="pt-3 text-right border-top">
                                            <Button onClick={() => setCreateModalShow(false)} variant="secondary">
                                                Close
                                            </Button>
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                )
                            }
                        />
                        <Row>
                            <Col className="d-flex justify-content-between">
                                <Button onClick={() => setCreateModalShow(true)} variant="info" size="sm" className="my-3 d-flex align-items-center text-center">
                                    Create New Record
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table striped responsive hover size="sm">
                                    <thead>
                                        <tr>
                                            <th><small>Symbols</small></th>
                                            <th><small>Change</small></th>
                                            <th><small>Shares</small></th>
                                            <th><small>Cost / Share</small></th>
                                            <th><small>Market Value</small></th>
                                            <th><small>Day Gain</small></th>
                                            <th><small>Total Gain</small></th>
                                            <th><small>Notes</small></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {portfolio.records?.map(record => (
                                            <tr key={record.id}>
                                                <td>
                                                    <Link to={`/stock/${record.symbol}/?prev=${path}`}>{record.symbol}</Link>
                                                    <div><small>Price: {record.symbol_price}</small></div>
                                                    <div><small>Traded on: {record.trade_date}</small></div>
                                                </td>
                                                <td>
                                                    <ColoredCodecNumber value={record.change_value} />
                                                    <div><small><ColoredCodecNumber value={record.change_percent} prefix="%" /></small></div>
                                                </td>
                                                <td>{record.shares}</td>
                                                <td>{record.cost_per_share}</td>
                                                <td>{record.market_value}</td>
                                                <td>
                                                    <ColoredCodecNumber value={record.gain_value} />
                                                    <div><small><ColoredCodecNumber value={record.gain_percent} prefix="%" /></small></div>
                                                </td>
                                                <td><ColoredCodecNumber value={record.total_gain} /></td>
                                                <td>{record.notes}</td>
                                                <td>
                                                    <ModalForm
                                                        show={updateModalShow}
                                                        onClose={() => setUpdateModalShow(false)}
                                                        title="Update Record"
                                                        body={
                                                            (
                                                                <Form onSubmit={handelUpdateRecordSubmit}>
                                                                    <Form.Group className="mb-3">
                                                                        <Form.Label>Stock Symbol</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            value={symbol}
                                                                            placeholder="Search Stock Symbol / Name"
                                                                            ref={symbolInputRef}
                                                                            onChange={(e) => e.preventDefault()}
                                                                        />
                                                                    </Form.Group>
                                                                    <Form.Group className="mb-3">
                                                                        <Form.Label>Trading Date</Form.Label>
                                                                        <DatePicker
                                                                            selected={tradeDate}
                                                                            onChange={(e) => {
                                                                                setTradeDate(e);
                                                                            }}
                                                                            className="form-control"
                                                                            maxDate={today}
                                                                        />
                                                                    </Form.Group>
                                                                    <Form.Group className="mb-3">
                                                                        <Form.Label>Shares</Form.Label>
                                                                        <Form.Control
                                                                            type="number"
                                                                            step="any"
                                                                            placeholder="Shares"
                                                                            value={shares}
                                                                            onChange={(e) => setShares(e.target.value)}
                                                                        />
                                                                    </Form.Group>
                                                                    <Form.Group className="mb-3">
                                                                        <Form.Label>Cost Per Share</Form.Label>
                                                                        <Form.Control
                                                                            type="number"
                                                                            step="any"
                                                                            placeholder="Cost Per Share"
                                                                            value={costPerShares}
                                                                            onChange={(e) => setCostPerShares(e.target.value)}
                                                                        />
                                                                    </Form.Group>
                                                                    <Form.Group className="mb-3">
                                                                        <Form.Label>Notes</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Notes"
                                                                            value={notes}
                                                                            onChange={(e) => setNotes(e.target.value)}
                                                                        />
                                                                    </Form.Group>
                                                                    <Form.Group className="pt-3 text-right border-top">
                                                                        <Button onClick={() => {
                                                                            setSelectedRecord("")
                                                                            setUpdateModalShow(false)
                                                                        }} variant="secondary">
                                                                            Close
                                                                        </Button>
                                                                        <Button variant="primary" type="submit">
                                                                            Submit
                                                                        </Button>
                                                                    </Form.Group>
                                                                </Form>
                                                            )
                                                        }
                                                    />
                                                    <Button
                                                        variant="info"
                                                        value={record.id}
                                                        onClick={() => {
                                                            setSelectedRecord(record.id)
                                                            setSymbol(record.symbol)
                                                            setTradeDate(new Date(record.trade_date))
                                                            setShares(record.shares)
                                                            setCostPerShares(record.cost_per_share)
                                                            setNotes(record.notes)
                                                            setUpdateModalShow(true)
                                                        }}
                                                        size="sm"
                                                        className="my-3 mr-3">
                                                        Update
                                                    </Button>
                                                    <Button
                                                        variant="info"
                                                        value={record.id}
                                                        onClick={handelDeleteRecord}
                                                        size="sm"
                                                        className="my-3">
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </>
                )
            }
        </>
    )
}
