import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import ColoredCodecNumber from '../components/ColoredCodecNumber'
import Message from '../components/Message'
import ModalForm from '../components/ModalForm'
import { createPortfolio, getPortfolio, deletePortfolio } from '../actions/portfolioAction'
import { useHistory } from 'react-router-dom'

export default function PortfolioScreen() {

    let history = useHistory()
    const path = history.location.search ? history.location.pathname + history.location.search : history.location.pathname

    const [modalShow, setModalShow] = useState(false);
    const [portfolioName, setPortfolioName] = useState('')

    const dispatch = useDispatch()
    const portfolioList = useSelector(state => state.portfolioList)
    const { error, loading, portfolios } = portfolioList
    
    useEffect(() => {
        dispatch(getPortfolio())
    }, [])

    const handelCreatePortfolioSubmit = (e) => {
        e.preventDefault()
        dispatch(createPortfolio({ 'name': portfolioName}))
        setPortfolioName('')
        setModalShow(false)
    }

    const handelDeletePortfolio = (e) => {
        e.preventDefault()
        const portfolio_id = e.target.value
        dispatch(deletePortfolio(portfolio_id))
    }

    const handelUpdatePortfolio  = (e) => {
        e.preventDefault()
        console.log("update")
    }

    if(loading) 
        return <Loader />
    return (
        <>  
            {error ? <Message variant='danger'>{error}</Message>
                :
                (
                    <>
                    <ModalForm
                        show={modalShow}
                        title="Create New Portfolio"
                        body={
                            (
                                <Form onSubmit={handelCreatePortfolioSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Portfolio Name</Form.Label>
                                        <Form.Control 
                                            type="name" 
                                            placeholder="Enter Portfolio Name" 
                                            value={portfolioName}
                                            onChange={(e) => setPortfolioName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="pt-3 text-right border-top" controlId="formBasicEmail">
                                        <Button onClick={() => setModalShow(false)} variant="secondary">
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
                            <Button 
                                onClick={() => setModalShow(true)} 
                                variant="info" 
                                size="sm" 
                                className="my-3 d-flex align-items-center text-center">
                                Create New Portfolio
                            </Button>
                        </Col>
                    </Row>
                        {portfolios.length > 0 &&
                            <Row>
                                <Col>
                                    <Table striped responsive hover size="sm">
                                        <thead>
                                            <tr>
                                                <th><small>Name</small></th>
                                                <th><small>Symbols</small></th>
                                                <th><small>Market Value</small></th>
                                                <th><small>Day Change</small></th>
                                                <th><small>Day Change%</small></th>
                                                <th><small>Total Change</small></th>
                                                <th><small>Total Change %</small></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {portfolios?.map(portfolio => (
                                                <tr key={portfolio.id}>
                                                    <td>
                                                        <Link to={`/portfolio/${portfolio.id}/?prev=${path}`}>{portfolio.name}</Link>
                                                        <div><small>Last Updated at: {portfolio.updatedAt}</small></div>
                                                    </td>
                                                    <td>{portfolio.symbols}</td>
                                                    <td>{portfolio.market_value}</td>
                                                    <td><ColoredCodecNumber value={portfolio.day_change_value} /></td>
                                                    <td><ColoredCodecNumber value={portfolio.day_change_percent} prefix="%" /></td>
                                                    <td><ColoredCodecNumber value={portfolio.total_change} /></td>
                                                    <td><ColoredCodecNumber value={portfolio.total_change_percent} prefix="%" /></td>
                                                    <td>
                                                        <Button
                                                            variant="info"
                                                            value={portfolio.id}
                                                            onClick={handelUpdatePortfolio}
                                                            size="sm"
                                                            className="my-3">
                                                            Update
                                                        </Button>
                                                        <Button
                                                            variant="info"
                                                            value={portfolio.id}
                                                            onClick={handelDeletePortfolio}
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
                        }
                </>
                )
            }
        </>
    )
}
