import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class CarsListContainer extends  Component {

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

    componentDidMount() {
        var component = this;
        axios.get(this.state.carsUrl).then((res) => {
            console.log(res.data.links);
            const carsArr = res.data.content;
            const dataAsLiElmts = carsArr.map((car) => {
                const orderOneCarLink = `/order-car/${car._id}`;
                return (
                    <li key={car._id}>
                        <Link to={orderOneCarLink} >{car.name}</Link>
                    </li>
                );
            });
            component.setState({cars: dataAsLiElmts, links: res.data.links});
        });
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

    render(){
        return (
            <div>
                <ul>{this.state.cars}</ul>
                <hr />
                <button onClick={() => this.handlePrevBtnClick(this.state.links)}>
                    prev
                </button>
                <button onClick={() => this.handleNextBtnClick(this.state.links)}>
                    next
                </button>
            </div>
        );
    }

}

export default CarsListContainer;