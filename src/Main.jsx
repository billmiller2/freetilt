import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { CalculatorContainer } from './equitycalculator'

export const Main = () => (
    <Switch>
        <Route exact path='/' component={CalculatorContainer} />
    </Switch>
)
