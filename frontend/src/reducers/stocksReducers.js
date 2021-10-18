import {
    STOCKS_LIST_REQUEST,
    STOCKS_LIST_SUCCESS,
    STOCKS_LIST_FAIL,

    STOCKS_TOP_GAINER_REQUEST,
    STOCKS_TOP_GAINER_SUCCESS,
    STOCKS_TOP_GAINER_FAIL,
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


export const stocksTopGainerReducer = (state = { stocks: [] }, action) => {
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
