import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import { APPEARANCE_SETTING, FETCH_ERROR, FETCH_START, FETCH_SUCCESS, GET_QUOTE, PERSON_DATA } from '../../constants/ActionTypes';
import axios from '../../util/Api';
import asyncComponent from '../../util/asyncComponent';

export default function PublicRoute(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        const { entoken } = props.match.params;
        localStorage.setItem('entoken', entoken);
        dispatch({ type: FETCH_START });
        axios.post('/quotes/view-public/quote', { entoken }).then(({ data }) => {
            console.log("========== PUBLIC DATA =========", data);
            const { quote, person, appearanceSetting } = data;
            dispatch({ type: APPEARANCE_SETTING, payload: appearanceSetting });
            dispatch({ type: PERSON_DATA, payload: person });
            dispatch({ type: GET_QUOTE, payload: quote });
            dispatch({ type: FETCH_SUCCESS });
        }).catch(err => {
            history.push('/error404');
            dispatch({ type: FETCH_ERROR, payload: err.message });
            console.log("Error****:", err.message);
        });
    }, [])
    return (
        <Switch>
            <Route exact path='/q/:entoken' component={asyncComponent(() => import("./PublicQuoteView"))} />
            <Route exact path='/q/:entoken/preview' component={asyncComponent(() => import("./PublicQuoteView"))} />
            <Route exact path='/q/:entoken/author' component={asyncComponent(() => import("./PublicQuoteView"))} />
            <Route exact path='/q/:entoken/accepted' component={asyncComponent(() => import("./Accepted"))} />
            <Route exact path='/q/:entoken/decline' component={asyncComponent(() => import("./Decline"))} />
        </Switch>
    )
}
