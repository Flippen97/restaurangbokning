import React from 'react';
import styled from 'styled-components';
//import bgimg from './../../img/bg.jpg';

function Container(props) {
    const ContainerStyle = styled.div`
        width: ${props.width}
        height: ${props.height}
        margin: 0px auto;
        padding: 0px;
        color: ${props.color};
        background-color: ${props.bgcolor}
        background-image: url(${props.backgroundimg});
        border: ${props.border};

        a {
            color: ${props.color};
        }
    `;

    return (<ContainerStyle>{ props.children }</ContainerStyle>);
}

export default Container;