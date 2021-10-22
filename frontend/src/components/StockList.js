import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Form, Table } from 'react-bootstrap'
import { FaRegStar } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { getPortfolio, createPortfolioRecord } from '../actions/portfolioAction'
import ModalForm from '../components/ModalForm'
import ColoredCodecNumber from '../components/ColoredCodecNumber'


export default function StockList({ title, seeMoreLink, showAddToPortfolioButton, stocks }) {

    let history = useHistory()
    const prev = history.location.search ? history.location.pathname + history.location.search : history.location.pathname

    const [selectedStocks, setSelectedStocks] = useState([])
    const [addModalShow, setAddModalShow] = useState(false)
    const addToPortfolioButton = useRef()

    const dispatch = useDispatch()
    const portfolioList = useSelector(state => state.portfolioList)
    const { portfolios } = portfolioList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        const handler = (e) => {
            if (addToPortfolioButton.current?.contains(e.target)) {
                setAddModalShow(true)
            }
        }
        window.addEventListener("click", handler)
        return () => window.removeEventListener('click', handler)
    })

    useEffect(() => {
        dispatch(getPortfolio())
        if (showAddToPortfolioButton && selectedStocks.length === 0) {
            addToPortfolioButton.current.disabled = true
        }
        if (showAddToPortfolioButton && selectedStocks.length > 0) {
            addToPortfolioButton.current.disabled = false
        }
    }, [dispatch, showAddToPortfolioButton, selectedStocks])

    const handleStockCheckboxClick = (e) => {
        let stockSymbol = e.target.value
        setSelectedStocks(prevSelectedStock => {
            if (prevSelectedStock.find(x => x === stockSymbol)) {
                return prevSelectedStock.filter(x => x !== stockSymbol)
            } else {
                return [...prevSelectedStock, stockSymbol]
            }
        })
    }

    const handelAddRecordInPortfolio = (e) => {
        const id = e.currentTarget.value
        selectedStocks.forEach((item) => {
            let record = {
                symbol: item,
                trade_date: new Date(),
                shares: 0,
                cost_per_share: 0,
                notes: ''
            }
            dispatch(createPortfolioRecord({ id: id, record: record }))
            history.push(`/portfolio/${id}/`)
        })   
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-baseline">
                <h4>{title}</h4>
                {showAddToPortfolioButton && userInfo ?
                    <>
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
                            disabled 
                            ref={addToPortfolioButton}
                            variant="outline-info" 
                            size="sm" 
                            className="d-flex align-items-center">
                            <FaRegStar size="1rem" className="mr-2" />  Add To Portfolio
                        </Button>
                    </>
                    : ""
                }
                {seeMoreLink && <Link to={seeMoreLink}>See More...</Link>}
            </div>
            <Table striped responsive hover size="sm">
                <thead>
                    <tr>
                        <th><small>Symbol</small></th>
                        <th><small>Last Price</small></th>
                        <th><small>Change</small></th>
                        <th><small>% Change</small></th>
                    </tr>
                </thead>
                <tbody>
                    {stocks?.map(stock => (
                        <tr key={stock.symbol}>
                            <td>
                                {showAddToPortfolioButton && userInfo ? <Form.Check
                                        type="checkbox"
                                        id="default-checkbox"
                                        onChange={handleStockCheckboxClick}
                                        value={stock.symbol}
                                        label={<Link to={`/stock/${stock.symbol}/?prev=${prev}`}>{stock.symbol}</Link>}
                                    />
                                    :
                                    <Link to={`/stock/${stock.symbol}/?prev=${prev}`}>{stock.symbol}</Link>
                                }
                                <div><small>{stock.name}</small></div>
                            </td>
                            <td>{stock.price}</td>
                            <td>
                                <ColoredCodecNumber value={stock.change_amount} />
                            </td>
                            <td>
                                <ColoredCodecNumber value={stock.change_percent} prefix="%" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
