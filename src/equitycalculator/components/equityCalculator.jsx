import * as React from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import {
    BoardContainer,
    BreakdownContainer,
    CardBankContainer,
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
                <Col xs={12} sm={12} md={2} className="col-md-push-9 col-lg-push-8">
                    <BreakdownContainer />
                </Col>
                <Col xs={12} sm={2} className="col-lg-push-3 col-md-push-4 col-sm-push-9">
                    <EquityContainer />
                </Col>
                <Col xs={12} sm={4} className="col-lg-pull-1 col-sm-push-3 col-md-push-0">
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
                <Col xs={12} sm={4} md={3} lg={2} className="col-md-pull-8 col-sm-pull-6">
                    <CardBankContainer />
                </Col>
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

