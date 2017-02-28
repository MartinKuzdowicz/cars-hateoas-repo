import React, {Component} from 'react';
import axios from 'axios';

class OrderCarForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageTitle: '',
            carToOrder: {},
            getOneCarUrl: 'http://localhost:3000/api/cars-repo/cars',
            orderCarPostUrl: 'http://localhost:3002/api/cars-orders/place-order'
        }
    }

    componentWillMount() {
        this.setState({
            pageTitle: 'Order Car'
        });
    };

    componentDidMount() {
        const component = this;
        const carToOrderID = this.props.params.carId;
        const oneCarUrl = `${this.state.getOneCarUrl}/${carToOrderID}`;
        axios.get(oneCarUrl)
            .then(car => {
                component.setState({
                    carToOrder: car.data
                });
            }).catch(error => console.error(error));
    };


    orderCarBtnHandler(e) {
        e.preventDefault();

        const carToOrderObj = this.state.carToOrder;
        const carToOrderUrl = this.state.orderCarPostUrl;

        console.log(carToOrderUrl);

        if(!carToOrderObj) {
            alert('error carToOrder is blank');
            return;
        }

        axios.post(carToOrderUrl, {carToOrderId: carToOrderObj._id})
            .then(res => {
                alert(res.msg);
            }).catch(error => console.error(error));

    };

    render() {
        return (
            <div>
                <h3>{this.state.pageTitle}</h3>
                <div>
                    <form>
                        brand
                        <input id="car_brand" value={this.state.carToOrder.name}/>
                        carModelName
                        <input id="car_model" value={this.state.carToOrder.carModelName}/>
                        type
                        <input id="car_type" value={this.state.carToOrder.type}/>
                        avgPrice
                        <input id="car_avg_price" type="number" value={this.state.carToOrder.avgPrice}/>

                        <button onClick={(e) => this.orderCarBtnHandler(e)}>confirm car order</button>
                    </form>
                </div>
            </div>
        )
    }

}
;

export default OrderCarForm;