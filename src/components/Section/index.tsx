import React from 'react';

function Section(props: any) {
    return (
        <div className={'section'}>
            {props.children}
        </div>
    );
}

export function SectionTitle(props: any) {
    return (
        <div className={'section__title'}>
            {props.children}
        </div>
    );
}

export function SectionBody(props: any) {
    return (
        <div className={'section'}>
            {props.children}
        </div>
    );
}

export default Section;