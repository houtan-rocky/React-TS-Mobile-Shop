import React, {Component, useState} from "react";

export function Tabs (props: any) {
    const [selected, setSelected] = useState( props.selected || 2);

    const handleChange = (index: any) => {
        setSelected( index );
    }

        return (
            <>
                <ul>
                    {props.children.map((elem: any, index: any) => {
                        let style = index === selected ? "selected" : "";
                        return (
                            <li
                                key={index}
                                className={style}
                                onClick={() => handleChange(index)}
                            >
                                {elem.props.title}
                            </li>
                        );
                    })}
                </ul>
                <div className="tab">{props.children[selected]}</div>
            </>
        );

}