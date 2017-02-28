import React, {Component} from 'react';
import axios from 'axios';

class OrderCarForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageTitle: '',
            getOneCarUrl: 'http://localhost:3000/api/cars-repo/cars',
            orderCarPostUrl: 'http://localhost:3002/api/cars-orders/place-order'
        }
    }

    componentDidMount() {
        this.setState({
            pageTitle: 'Order Car'
        });
    };


    orderCarBtnHandler(e) {

        e.preventDefault();

        alert('orderCarBtnHandler');
    };

    render() {
        return (
            <div>
                <h3>{this.state.pageTitle}</h3>
                <div>
                    <form>
                        brand
                        <input id="car_brand" />
                        carModelName
                        <input id="car_model"/>
                        type
                        <input id="car_type"/>
                        avgPrice
                        <input id="car_avg_price" type="number"/>

                        <button onClick={(e) => this.orderCarBtnHandler(e)}>confirm car order</button>
                    </form>
                </div>
            </div>
        )
    }

}
;

export default OrderCarForm;