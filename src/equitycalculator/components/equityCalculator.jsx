import * as React from 'react'
import { Grid, Col } from 'react-bootstrap'
import { Cards } from './'

export class EquityCalculator extends React.Component {
    render() {
        return (
            <Grid>
                <h3>Equity Calculator</h3>
                <Col xs={6}>
                    <Cards />
                </Col>
                <Col xs={6}>
                </Col>
            </Grid>
        )
    }
}

