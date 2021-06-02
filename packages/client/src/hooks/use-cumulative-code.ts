import { useTypedSelector } from './use-typed-selector'

export const useCumulativeCode = (cell_id:string) => {
    return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const cumulativeData = order.map((id) => data[id]);
    // cumulative code data initialized with:
    // show function - displays primitive values, objects, and JSX elements
    // React and ReactDom always imported separately to prevent import conflict 

    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = (value) => {
            const display = document.querySelector('#root')
            if(typeof value === 'object'){
                if(value.$$typeof && value.props){
                    _ReactDOM.render(value, display)
                } else {
                    display.innerHTML = JSON.stringify(value)
                }
            } else {
                display.innerHTML = value;
            }
        }
    `
    let diffShowFunc = `var show = () => {}`

    const cumulativeCodeData = []
    // get all content from cells before this current cell id if they have type: 'code'
    for(let c of cumulativeData){
        if(c.type === 'code'){
            if(c.id === cell_id){
                cumulativeCodeData.push(showFunc)
            } else {
                cumulativeCodeData.push(diffShowFunc)
            }
            cumulativeCodeData.push(c.content)
        }
        if(c.id === cell_id){
            break
        }
    }
    return cumulativeCodeData

  });
};