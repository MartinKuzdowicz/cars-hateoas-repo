import React, {Component} from 'react';
import {Link} from 'react-router';

class Navigation extends Component {

    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="home">AllCars</Link>
                        </li>
                        <li>
                            <Link to="add-car">AddCarForm</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }

}


export default Navigation;