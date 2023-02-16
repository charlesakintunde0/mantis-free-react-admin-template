import React from 'react';
import './button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline']; //these two are the button class names
const SIZES = ['btn--medium','button--large']; // again class names

export const Button = ({children, type, onClick, buttonStyle, buttonSize}) => {
    /* The below line of code set the button style to the given style by user,
    If none given then it automatically selects the first style elemetn from our STYLE array*/
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return(
        <Link to="/registration" className='btn-mobile'>
            <button className = {`btn ${checkButtonStyle} ${checkButtonSize}`} onClick = {onClick} type = {type}> {/* className will be set depending on the style and size I want */}
                {children} {/* the children is the text that will display on the button */}
            </button>
        </Link>
    )
}