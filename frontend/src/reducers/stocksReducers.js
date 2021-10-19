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

export const stocksListReducer = (state = { stocks: [] }, action) => {
    switch (action.type) {
        case STOCKS_LIST_REQUEST:
            return { loading: true, stocks: [] }

        case STOCKS_LIST_SUCCESS:
            return {
                loading: false,
                stocks: action.payload.stocks,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case STOCKS_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const stockDetailsReducer = (state = { stock: {} }, action) => {
    switch (action.type) {
        case STOCKS_DETAILS_REQUEST:
            return { loading: true, ...state }

        case STOCKS_DETAILS_SUCCESS:
            return { loading: false, stock: action.payload }

        case STOCKS_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const stocksTopGainersReducer = (state = { stocks: [] }, action) => {
    switch (action.type) {
        case STOCKS_TOP_GAINER_REQUEST:
            return { loading: true, stocks: [] }

        case STOCKS_TOP_GAINER_SUCCESS:
            return { loading: false, stocks: action.payload, }

        case STOCKS_TOP_GAINER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const stocksTopLosersReducer = (state = { stocks: [] }, action) => {
    switch (action.type) {
        case STOCKS_TOP_LOSER_REQUEST:
            return { loading: true, stocks: [] }

        case STOCKS_TOP_LOSER_SUCCESS:
            return { loading: false, stocks: action.payload, }

        case STOCKS_TOP_LOSER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

