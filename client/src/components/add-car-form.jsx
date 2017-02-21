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

    render() {
        return (
            <div>
                <h3>{this.state.pageTitle}</h3>
            </div>
        );
    }

}

export default AddCarForm;