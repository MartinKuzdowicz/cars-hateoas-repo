import React from 'react';
import Navigation from './navigation.jsx';

class App extends React.Component {

    render() {
        return (
            <div>
                <Navigation/>
                <h1>Cars Repository</h1>
                {this.props.children}
            </div>
        );
    }
}

export default App;