import React, {ReactPropTypes} from 'react';

interface IGridProps {
    col: number;
    mdCol: number;
    smCol: number;
    gap: number;
    children: any
}

function Grid(props: IGridProps) {
    const style = {
        gap: props.gap ? `${props.gap}px` : '0',
    };

    const col = props.col ? `grid-col-${props.col}` : '';
    const mdCol = props.mdCol ? `grid-col-${props.mdCol}` : '';
    const smCol = props.smCol ? `grid-col-${props.smCol}` : '';

    return (
        <div className={`grid ${col} ${mdCol} ${smCol}`} style={style}>
            {props.children}
        </div>
    );
}



export default Grid;