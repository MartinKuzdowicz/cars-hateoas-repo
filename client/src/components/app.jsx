import React from 'react';
import {Link} from 'react-router';

class App extends React.Component {

    render() {
        return (
            <div>
                <h1>Cars Repository</h1>
                <ul>
                    <li>
                        <Link to="home">AllCars</Link>
                    </li>
                    <li>
                        <Link to="add-car">AddCarForm</Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default App;