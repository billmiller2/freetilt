import {
    checkKicker,
    getHandEquity
} from '../oddsCalculator'

import {
    UNICODE_SPADES,
    UNICODE_HEARTS,
    UNICODE_CLUBS
} from '../../constants'

it('calculates hand equities correctly', () => {
    let hands = {
        1: {
            1: {
                rank: "A",
                suit: UNICODE_SPADES
            },
            2: {
                rank: "K",
                suit: UNICODE_SPADES
            }
        },
        2: {
            1: {
                rank: "K",
                suit: UNICODE_CLUBS
            },
            2: {
                rank: "K",
                suit: UNICODE_HEARTS
            }
        }
    }

    let board = {
        1: {
            rank: "",
            suit: ""
        },
        2: {
            rank: "",
            suit: ""
        },
        3: {
            rank: "",
            suit: ""
        },
        4: {
            rank: "",
            suit: ""
        },
        5: {
            rank: "",
            suit: ""
        }
    }

    let equities = getHandEquity(hands, board)
    let handOneEquity = equities[0]
    let handTwoEquity = equities[1]

    expect(+handOneEquity).toBeGreaterThanOrEqual(0.33)
    expect(+handOneEquity).toBeLessThanOrEqual(0.35)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.65)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.67)
})

it('checks kickers correctly', () => {
    let handOneRanks = ['K', 'J', '6', '5', '4', '4', '2']
    let handTwoRanks = ['K', 'Q', '6', '5', '4', '4', '2']

    expect(checkKicker(handOneRanks, handTwoRanks)).toEqual(2)

    handOneRanks = ['A', 'J', '6', '5', '4', '4', '2']
    handTwoRanks = ['K', 'Q', '6', '5', '4', '4', '2']

    expect(checkKicker(handOneRanks, handTwoRanks)).toEqual(1)
})

