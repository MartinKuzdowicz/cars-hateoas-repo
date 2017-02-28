import React from 'react';
import CarsListContainer from '../containers/cars-list-container.jsx';

class AllCars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {pageTitle: ''}
    };

    componentDidMount() {
        this.setState({
            pageTitle: 'All Cars'
        });
    };

    render() {
        return (
            <div>
                <h3>{this.state.pageTitle}</h3>
                <CarsListContainer />
            </div>
        );
    }
}

export default AllCars;