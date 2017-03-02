import React, {Component} from 'react';
import axios from 'axios';

const getValueById = (elId) => {
    return document.querySelector(`#${elId}`).value
}

class AddCarForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageTitle: '',
            createCarPostUrl: 'http://localhost:3000/api/cars-repo/cars',
            createdMsg: ''
        }
    };

    componentDidMount() {
        this.setState({
            pageTitle: 'Add car form'
        });
    };

    addCarBtnHandler(e) {

        e.preventDefault();

        const newCar = {
            name: getValueById('car_brand'),
            carModelName: getValueById('car_model'),
            type: getValueById('car_type'),
            avgPrice: Number(getValueById('car_avg_price')),
            inStock: getValueById('car-is-in-stock').checked
        }
        
        axios.post(this.state.createCarPostUrl, newCar)
            .then(() => {
                this.setState(
                    Object.assign(this.state, {createdMsg: 'car was created !'})
                )
            }).catch((err) => {
            console.log(err)
        })

    };

    render() {
        return (
            <div>
                <h3>{this.state.pageTitle}</h3>
                <div>
                    <form>
                        brand
                        <input id="car_brand"/>
                        carModelName
                        <input id="car_model"/>
                        type
                        <select id="car_type">
                            <option>sport</option>
                            <option>limo</option>
                            <option>family</option>
                            <option>modern</option>
                        </select>
                        avgPrice
                        <input id="car_avg_price" type="number"/>
                        in stock
                        <input type="checkbox" id="car-is-in-stock" />

                        <button onClick={(e) => this.addCarBtnHandler(e)}>add car</button>
                    </form>
                </div>
                <hr />
                <div>
                    <p id="created_msg">
                        {this.state.createdMsg}
                    </p>
                </div>
            </div>
        );
    }

}

export default AddCarForm;