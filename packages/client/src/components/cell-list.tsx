import { useTypedSelector } from '../hooks/use-typed-selector'
import { useActions } from '../hooks/use-actions'
import CellListItem from '../components/cell-list-item'
import AddCell from './add-cell'
import React, { useEffect } from 'react';
import './cell-list.css'

const CellList: React.FC = () => {
    const cells = useTypedSelector(({cells: {order, data }}) => {
        return order.map((id) => {
            return data[id]
        })
    });

    const { fetchCells } = useActions()

    useEffect(() => {
        fetchCells();
    }, [])

    const renderedCells = cells.map((cell) => {
        return <React.Fragment key = {cell.id}>
            <CellListItem cell = {cell}/> 
            <AddCell forceVisible = {cells.length === 0} nextCellId = {cell.id}></AddCell>
        </React.Fragment>
    })
    return (
        <div className = 'cell-list'> 
            <AddCell forceVisible = {cells.length === 0} nextCellId = {null}></AddCell>
            {renderedCells}
        </div>
    )
}

export default CellList