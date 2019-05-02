import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/matcha.png'

const style = {'font-size': '2em', 'color': 'rgb(227, 86, 88)'};

export const Logo = (props) => (
    <div {...props}>
        <NavLink to="" >
            <img alt="Logo" src={logo} style={{ 'width': '220px', 'height': '50px', 'margin': '5px'}}/>
        </NavLink>
    </div>
)

export const Menu = (props) => (
    <span style={style} {...props}>
        <i class="fas fa-bars"></i>
    </span>
)

export const Chat = (props) => (
    <span style={style} {...props}>
        <i class="fas fa-envelope"></i>
    </span>
)

export const Alert = (props) => (
    <span style={style} {...props}>
        <i class="fas fa-bell"></i>
    </span>
)

export const Account = (props) => (
    <span style={style} {...props}>
        <i class="far fa-user-circle"></i>
    </span>
)