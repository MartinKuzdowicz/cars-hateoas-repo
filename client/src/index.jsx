import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import AllCars from './components/all-cars.jsx';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import AddCarForm from './components/add-car-form.jsx';


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={AllCars}/>
            <Route path="home" component={AllCars} />
            <Route path="add-car" component={AddCarForm}/>
        </Route>
    </Router>
    , document.getElementById('root'));
