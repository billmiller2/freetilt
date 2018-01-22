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
                <div className="buffer-row" />
                <Col xs={3} md={2}>
                    <CardsContainer />
                </Col>
                <Col xs={1} md={1}>
                </Col>
                <Col xs={3} md={2}>
                    <HandContainer number={1} />
                    <HandContainer number={2} />
                </Col>
                <Col xs={3} md={2}>
                    <EquityContainer />
                </Col>
                <Col xs={2} md={5}>
                </Col>
            </Grid>
        )
    }
}

