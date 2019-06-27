import * as React from 'react'
import { Grid, Col, Row } from 'react-bootstrap'

import {
    BoardButtonContainer,
    BreakdownContainer,
    ClearContainer,
    EvaluateContainer,
    HandRangeContainer,
    IncrementContainer
} from '../'

export class EquityCalculator extends React.Component {
    render() {
        const { handCount, board } = this.props

        let handRows = []
        for (let i = 0; i < handCount; i++) {
            handRows.push(
                <Row xs={6} md={12} key={i + 1}>
                    <Col xs={12}>
                        <HandRangeContainer number={i + 1} />
                    </Col>
                </Row>
            )
        }

        return (
            <Grid id="main">
                <div className="buffer-row" />
                <Col xs={12} md={6}>
                    {handRows}
                    <IncrementContainer />
                    <br /><br />
                    <Row xs={12} md={12}>
                        <Col xs={12}>
                            <BoardButtonContainer board={board} />
                        </Col>
                    </Row>
                    <Row md={12}>
                        <Col xs={12}>
                            <EvaluateContainer />
                            <ClearContainer />
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6}>
                    <BreakdownContainer />
                </Col>
                <Row className="visible-xs-block buffer-row" />
                <Row>
                    <div className="footer navbar-fixed-bottom visible-md visible-lg">
                        <p className="text-center" id="footer-text">
                            <small>
                            FreeTilt is an open source project.  Please report issues
                            <a href="https://www.github.com/billmiller2/freetilt/issues"> here</a>
                        </small>
                        </p>
                    </div>
                </Row>
            </Grid>
        )
    }
}

