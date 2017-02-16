import React from 'react';
import CarsListContainer from '../containers/cars-list-container.jsx';

class AllCars extends React.Component {

    render() {
        return (
            <div>
                <h1>All Cars</h1>
                <CarsListContainer />
            </div>
        );
    }
}

export default AllCars;