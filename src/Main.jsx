import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { EquityCalculator } from './equitycalculator'
import { Home } from './Home'

export const Main = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/equitycalculator' component={EquityCalculator} />
    </Switch>
)