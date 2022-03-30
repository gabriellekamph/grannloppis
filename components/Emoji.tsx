import React from 'react';

const Emoji = (props: any) => (
    <span
        className="emoji ml-1"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
)

export default Emoji