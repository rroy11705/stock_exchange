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

PORTFOLIO_DETAILS_UPDATE_REQUEST,
PORTFOLIO_DETAILS_UPDATE_SUCCESS,
PORTFOLIO_DETAILS_UPDATE_FAIL,

PORTFOLIO_RECORD_UPDATE_REQUEST,
PORTFOLIO_RECORD_UPDATE_SUCCESS,
PORTFOLIO_RECORD_UPDATE_FAIL

} from '../constants/portfolioConstants'


export const portfolioReducer = (state = { loading: true, portfolios: [] }, action) => {
    switch (action.type) {
        case PORTFOLIO_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PORTFOLIO_SUCCESS:
            return {
                loading: false,
                portfolios: action.payload
            }

        case PORTFOLIO_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case PORTFOLIO_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PORTFOLIO_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                portfolios: [...state.portfolios, action.payload]
            }

        case PORTFOLIO_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case PORTFOLIO_DETAILS_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case PORTFOLIO_DETAILS_UPDATE_SUCCESS:
            const index = state.portfolios.findIndex(x => x.id === action.payload.id)
            state.portfolios[index].name = action.payload.name
            state.portfolios[index].updatedAt = action.payload.updatedAt
            return {
                ...state,
                loading: false,
                portfolios: state.portfolios,
                success: true
            }

        case PORTFOLIO_DETAILS_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case PORTFOLIO_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PORTFOLIO_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                portfolios: state.portfolios.filter(x => x.id !== parseInt(action.payload)),
                success: true
            }

        case PORTFOLIO_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const portfolioDetailsReducer = (state = { loading: true, portfolio: { records: [] } }, action) => {
    switch (action.type) {
        case PORTFOLIO_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PORTFOLIO_DETAILS_SUCCESS:
            return {
                loading: false,
                portfolio: action.payload
            }

        case PORTFOLIO_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case PORTFOLIO_RECORD_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PORTFOLIO_RECORD_CREATE_SUCCESS:
            state.portfolio.records = [...state.portfolio.records, action.payload]
            return {
                ...state,
                loading: false,
                portfolio: state.portfolio
            }

        case PORTFOLIO_RECORD_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case PORTFOLIO_RECORD_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PORTFOLIO_RECORD_UPDATE_SUCCESS:
            const index = state.portfolio.records.findIndex(x => x.id === action.payload.id)
            state.portfolio.records[index] = action.payload
            return {
                ...state,
                loading: false,
                portfolio: state.portfolio,
                success: true
            }

        case PORTFOLIO_RECORD_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case PORTFOLIO_RECORD_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PORTFOLIO_RECORD_DELETE_SUCCESS:
            state.portfolio.records = state.portfolio.records.filter(x => x.id !== parseInt(action.payload))
            return {
                ...state,
                loading: false,
                portfolio: state.portfolio
            }

        case PORTFOLIO_RECORD_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
            
        default:
            return state
    }
}
