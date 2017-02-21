import React, {Component} from 'react';

class AddCarForm extends Component {

    constructor(props) {
        super(props);
        this.state = {pageTitle: ''}
    };

    componentDidMount() {
        this.setState({
            pageTitle: 'Add car form'
        });
    };

    addCarBtnHandler(e) {
        e.preventDefault();
        alert();
    };

    render() {
        return (
            <div>
                <h3>{this.state.pageTitle}</h3>
                <div>
                    <form>
                        brand
                        <input />
                        carModelName
                        <input />
                        type
                        <select>
                            <option>sport</option>
                            <option>limo</option>
                            <option>family</option>
                            <option>modern</option>
                        </select>
                        avgPrice
                        <input type="number" />

                        <button onClick={(e) => this.addCarBtnHandler(e)} >add car</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default AddCarForm;