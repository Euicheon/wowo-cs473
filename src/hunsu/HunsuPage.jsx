import React from 'react';
import Posts from './JSX/Posts'

import {Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';


const HunsuPage = () => {
	return (
		<div>
            <NavLink to='/post/create'> <Button variant='success'>Create</Button> </NavLink>
            <Posts/>
        </div>
	);
};

export default HunsuPage;
