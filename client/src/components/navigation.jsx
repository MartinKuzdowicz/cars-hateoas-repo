import React, {Component} from 'react';
import {Link} from 'react-router';

class Navigation extends Component {

    render(){
        return (
            <div>
                <ul>
                    <li>
                        <Link to="home">AllCars</Link>
                    </li>
                    <li>
                        <Link to="add-car">AddCarForm</Link>
                    </li>
                </ul>
            </div>
        );
    }

};

export default Navigation;