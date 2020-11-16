import React, { Component } from 'react'
import Posts from './Posts';

import {Button} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
class Body extends Component {

    render() {
        return (
            <div>
            <NavLink to='/create'> <Button variant='success'>Create</Button> </NavLink>
            <NavLink to='/filter'> <Button variant='success'>Filter</Button> </NavLink>
            <Posts/>
            </div>
        );
    }
};

export default Body;