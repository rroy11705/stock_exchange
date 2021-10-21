import axios from 'axios'

import {
    STOCKS_LIST_REQUEST,
    STOCKS_LIST_SUCCESS,
    STOCKS_LIST_FAIL,

    STOCKS_DETAILS_REQUEST,
    STOCKS_DETAILS_SUCCESS,
    STOCKS_DETAILS_FAIL,
    
    STOCKS_TOP_GAINER_REQUEST,
    STOCKS_TOP_GAINER_SUCCESS,
    STOCKS_TOP_GAINER_FAIL,

    STOCKS_TOP_LOSER_REQUEST,
    STOCKS_TOP_LOSER_SUCCESS,
    STOCKS_TOP_LOSER_FAIL,
} from '../constants/stocksConstants'

export const listStocks = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: STOCKS_LIST_REQUEST })

        const { data } = await axios.get(`/api/stocks/${keyword}`)

        dispatch({
            type: STOCKS_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STOCKS_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listStockDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: STOCKS_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/stocks/${id}/`)

        dispatch({
            type: STOCKS_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STOCKS_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listStocksTopGainers = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: STOCKS_TOP_GAINER_REQUEST })

        const { data } = await axios.get(`/api/stocks/top-gainers/${keyword}`)

        dispatch({
            type: STOCKS_TOP_GAINER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STOCKS_TOP_GAINER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listStocksTopLosers = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: STOCKS_TOP_LOSER_REQUEST })

        const { data } = await axios.get(`/api/stocks/top-losers/${keyword}`)

        dispatch({
            type: STOCKS_TOP_LOSER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STOCKS_TOP_LOSER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
