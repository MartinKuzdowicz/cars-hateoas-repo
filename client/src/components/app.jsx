import React from 'react';
import CarsListContainer from '../containers/cars-list-container.jsx';

class App extends React.Component {

    render() {
        return (
            <div>
                <h1>Cars repository UI</h1>
                <CarsListContainer />
            </div>
        );
    }
}

export default App;