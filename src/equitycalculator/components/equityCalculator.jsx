import * as React from 'react'
import { Grid, Col } from 'react-bootstrap'
import {
    CardsContainer,
    EquityContainer,
    HandContainer
} from '../'

export class EquityCalculator extends React.Component {
    render() {
        return (
            <Grid>
                <h3>Equity Calculator</h3>
                <Col xs={3} md={2}>
                    <CardsContainer />
                </Col>
                <Col xs={1} md={1}>
                </Col>
                <Col xs={3} md={2}>
                    <HandContainer number={1} />
                    <HandContainer number={2} />
                </Col>
                <Col xs={5} md={7}>
                    <EquityContainer />
                </Col>
            </Grid>
        )
    }
}

