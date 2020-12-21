import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import ResultFadeIn from './resultFadeIn';

const NotFoundWrapper = styled.div`
    max-width:600px;
    display:flex;
    justify-content:center;
    align-items:center;
    margin: 100px auto 0;
    padding: 20px;
    opacity: 20px;
    visibility:hidden;
    position: relative;
    border-radius:10px;
    top:20px;
    background-color:rgba(255, 255, 255, 0.3);
    border-radius:10px;
    animation: ${ResultFadeIn} 0.5s 1.4s forwards;
`;
const NotFoundIcon =styled.span`
    display:block;
    text-align:center;
    color:#FFFFFF;
    font-size:40px;
    margin-right:10px;
`;
const NotFoundText = styled.span`
    color:#632828;
    font-weight:bold;
    font-size:17px;
`;
const NotFound=()=>{
    return(
        <NotFoundWrapper>
            <NotFoundIcon>
                <NotFoundIcon icon={faFrown}/>
            </NotFoundIcon>
            <NotFoundText>Xin lỗi, không tìm thấy thành phố bạn đã điền vào!</NotFoundText>
        </NotFoundWrapper>
    )
};
export default NotFound;