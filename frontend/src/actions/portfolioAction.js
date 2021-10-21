import axios from 'axios'
import {
    PORTFOLIO_CREATE_REQUEST,
    PORTFOLIO_CREATE_SUCCESS,
    PORTFOLIO_CREATE_FAIL,

    PORTFOLIO_REQUEST,
    PORTFOLIO_SUCCESS,
    PORTFOLIO_FAIL,

    PORTFOLIO_DELETE_REQUEST,
    PORTFOLIO_DELETE_SUCCESS,
    PORTFOLIO_DELETE_FAIL,

    PORTFOLIO_DETAILS_REQUEST,
    PORTFOLIO_DETAILS_SUCCESS,
    PORTFOLIO_DETAILS_FAIL,

    PORTFOLIO_RECORD_CREATE_REQUEST,
    PORTFOLIO_RECORD_CREATE_SUCCESS,
    PORTFOLIO_RECORD_CREATE_FAIL,

    PORTFOLIO_RECORD_DELETE_REQUEST,
    PORTFOLIO_RECORD_DELETE_SUCCESS,
    PORTFOLIO_RECORD_DELETE_FAIL,

    PORTFOLIO_RECORD_UPDATE_REQUEST,
    PORTFOLIO_RECORD_UPDATE_SUCCESS,
    PORTFOLIO_RECORD_UPDATE_FAIL

} from '../constants/portfolioConstants'


export const createPortfolio = (portfolio) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PORTFOLIO_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/portfolio/`,
            portfolio,
            config
        )

        dispatch({
            type: PORTFOLIO_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PORTFOLIO_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getPortfolio = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PORTFOLIO_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/portfolio/`,
            config
        )

        dispatch({
            type: PORTFOLIO_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PORTFOLIO_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deletePortfolio = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PORTFOLIO_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(
            `/api/portfolio/${id}/`,
            config
        )

        dispatch({
            type: PORTFOLIO_DELETE_SUCCESS,
            payload: id
        })


    } catch (error) {
        dispatch({
            type: PORTFOLIO_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getPortfolioDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PORTFOLIO_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/portfolio/${id}/`,
            config
        )

        dispatch({
            type: PORTFOLIO_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PORTFOLIO_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createPortfolioRecord = ({ id, record }) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PORTFOLIO_RECORD_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/portfolio/${id}/record/`,
            record,
            config
        )

        dispatch({
            type: PORTFOLIO_RECORD_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PORTFOLIO_RECORD_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deletePortfolioRecord = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PORTFOLIO_RECORD_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(
            `/api/portfolio/record/${id}/`,
            config
        )

        dispatch({
            type: PORTFOLIO_RECORD_DELETE_SUCCESS,
            payload: id
        })


    } catch (error) {
        dispatch({
            type: PORTFOLIO_RECORD_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
