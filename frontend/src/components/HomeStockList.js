import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'


export default function HomeStockList({ title, seeMoreLink, stocks }) {

    let history = useHistory()
    const prev = history.location.search ? history.location.pathname + history.location.search : history.location.pathname

    return (
        <>
            <div className="d-flex justify-content-between">
                <h4>{title}</h4>
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
                                <Link to={`/stock/${stock.symbol}/?prev=${prev}`}>{stock.symbol}</Link>
                                <br />
                                <small>{stock.name}</small>
                            </td>
                            <td>{stock.price}</td>
                            <td>
                                <p className={stock.change_amount > 0 ? "text-success" : stock.change_amount < 0 ? "text-danger" : ""}>
                                    {stock.change_amount > 0 ? "+" + stock.change_amount : stock.change_amount}
                                </p>
                            </td>
                            <td>
                                <p className={stock.change_percent > 0 ? "text-success" : stock.change_percent < 0 ? "text-danger" : ""}>
                                    {stock.change_percent > 0 ? "+" + stock.change_percent + "%" : stock.change_percent + "%"}
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
