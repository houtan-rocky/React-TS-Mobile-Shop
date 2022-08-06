import React from 'react';

interface IHelmetProps {
    title: string;
}

function Helmet(props: any) {

    document.title = "Figikala - " + props.title;

    return (
        <>
            {props.children}
        </>
    );
}

export default Helmet;