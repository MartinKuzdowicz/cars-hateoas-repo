import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {cars: ''};
    }

    componentDidMount() {
        var component = this;
        axios.get('http://localhost:3000/api/cars-repo/cars').then((res) => {
            const carsArr = res.data;
            const dataAsLiElmts = carsArr.map((car) => {
                return (
                    <li key={car._id}>{car.name}</li>
                );
            });
            component.setState({cars: dataAsLiElmts});
        });

    }

    render() {
        return (
            <div>
                <h1>Cars repository UI</h1>
                <ul>{this.state.cars}</ul>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
