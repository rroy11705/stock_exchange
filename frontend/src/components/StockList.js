import React, { useState, useEffect, useRef } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaRegStar } from "react-icons/fa"
import { useHistory } from 'react-router-dom'
import ColoredCodecNumber from '../components/ColoredCodecNumber'


export default function StockList({ title, seeMoreLink, showAddToPortfolioButton, stocks }) {

    let history = useHistory()
    const prev = history.location.search ? history.location.pathname + history.location.search : history.location.pathname

    const [selectedStocks, setSelectedStocks] = useState([])
    const addToPortfolioButton = useRef()

    useEffect(() => {
        if (showAddToPortfolioButton && selectedStocks.length === 0) {
            addToPortfolioButton.current.disabled = true
        }
        if (showAddToPortfolioButton && selectedStocks.length > 0) {
            addToPortfolioButton.current.disabled = false
        }
    }, [showAddToPortfolioButton, selectedStocks])

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

    return (
        <>
            <div className="d-flex justify-content-between align-items-baseline">
                <h4>{title}</h4>
                {showAddToPortfolioButton ?
                    <Button ref={addToPortfolioButton} disabled variant="outline-info" size="sm" className="d-flex align-items-center">
                        <FaRegStar size="1rem" className="mr-2" />  Add To Portfolio
                    </Button>
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
                                {showAddToPortfolioButton ? <Form.Check
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
                                <ColoredCodecNumber value={stock.change_amount} prefix="%" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
