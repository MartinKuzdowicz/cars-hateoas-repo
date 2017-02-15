import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cars: '', links: [{
                rel: '',
                href: ''
            }],
            carsUrl: 'http://localhost:3000/api/cars-repo/cars'
        };
    }

    handleNextBtnClick(links) {
        const apiUrl = links
            .filter((l) => l.rel == 'next')
            .map((l) => l.href);

        this.setState({
            carsUrl: apiUrl
        });
        this.componentDidMount();
    }

    handlePrevBtnClick(links) {
        const apiUrl = links
            .filter((l) => l.rel == 'prev')
            .map((l) => l.href);

        this.setState({
            carsUrl: apiUrl
        });
        this.componentDidMount();
    }

    componentDidMount() {
        var component = this;
        axios.get(this.state.carsUrl).then((res) => {
            console.log(res.data.links);
            const carsArr = res.data.content;
            const dataAsLiElmts = carsArr.map((car) => {
                return (
                    <li key={car._id}>{car.name}</li>
                );
            });
            component.setState({cars: dataAsLiElmts, links: res.data.links});
        });

    }

    render() {
        return (
            <div>
                <h1>Cars repository UI</h1>
                <ul>{this.state.cars}</ul>
                <hr />
                <button onClick={() => this.handleNextBtnClick(this.state.links)}>
                    next
                </button>
                <button onClick={() => this.handlePrevBtnClick(this.state.links)}>
                    prev
                </button>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
