/*Header Component
  This component is always shown on every page*/

import React from 'react';
import './Header.css';
import imgfile from './logo1.png';

const MenuItem = ({active, children, to}) => (
    <div className="menu-item">
            {children}
    </div>
)


const Header = () => {
    return (
        <div>
            
        <div className="logo">
            Merona
            </div>
            
            <div className ="sub_title">
                    경희대학교 메이플 동아리
                    </div>
            <div className="menu">
                <MenuItem>홈</MenuItem> <br/>
                <MenuItem>동아리 소개</MenuItem> <br/>
                <MenuItem>공지사항</MenuItem> <br/>
                <MenuItem>일정 및 이벤트</MenuItem> <br/>
                <MenuItem>메이플 게시판</MenuItem> <br/>
                <MenuItem>자유 게시판</MenuItem> <br/>
                <MenuItem>메할일</MenuItem> <br/>
            </div>
        </div>
    );
};

export default Header;