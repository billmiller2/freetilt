import * as React from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
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
                <Col xs={12} md={2} className="col-md-push-5">
                    <EquityContainer />
                </Col>
                <Col xs={12} md={2} className="col-md-push-1">
                    <Col xs={6} md={12}>
                        <HandContainer number={1} />
                    </Col>
                    <Col xs={6} md={12}>
                        <HandContainer number={2} />
                    </Col>
                </Col>
                <Row className="visible-xs-block buffer-row" />
                <Col xs={12} md={2} className="col-md-pull-4">
                    <CardsContainer />
                </Col>
            </Grid>
        )
    }
}

