import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state'

export const useActions = () => {
    const dispatch = useDispatch()
    // use memoization to prevent dependency array from triggering in components, created once with useDispatch()
    return useMemo(() => {
        // bind action creators to single useActions function
        return bindActionCreators(actionCreators, dispatch)
    }, [dispatch])
}