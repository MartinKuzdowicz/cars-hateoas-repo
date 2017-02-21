import React, {Component} from 'react';

class Footer extends Component {

    constructor(props){
        super(props);
        this.state = {footerContent: 'cars heateoas ui | contact'}
    }

    render() {
        return (
            <div>
                <footer>
                    {this.state.footerContent}
                </footer>
            </div>
        );
    };

};

export default Footer;