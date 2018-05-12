import * as React from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import {
    BoardContainer,
    CardsContainer,
    ClearContainer,
    EquityContainer,
    EvaluateContainer,
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
                <Col xs={12} md={3} className="col-md-push-1">
                    <Row xs={6} md={12}>
                        <HandContainer number={1} />
                    </Row>
                    <Row xs={6} md={12}>
                        <HandContainer number={2} />
                    </Row>
                    <Row xs={12} md={12}>
                        <BoardContainer />
                    </Row>
                    <Row md={12}>
                        <EvaluateContainer />
                        <ClearContainer />
                    </Row>
                </Col>
                <Row className="visible-xs-block buffer-row" />
                <Col xs={12} md={2} className="col-md-pull-5">
                    <CardsContainer />
                </Col>
                <Row>
                    <div className="footer navbar-fixed-bottom">
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

