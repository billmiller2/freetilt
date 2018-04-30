import {
    checkKicker,
    getHandEquity
} from '../oddsCalculator'

import {
    UNICODE_SPADES,
    UNICODE_HEARTS,
    UNICODE_CLUBS,
    UNICODE_DIAMONDS
} from '../../constants'

import { getCards } from '../'

it('calculates hand equities correctly', () => {
    const cards = getCards()

    const emptyCard = {
        rank: "",
        suit: ""
    }
    let hands = {
        1: {
            1: cards["AS"],
            2: cards["KS"]
        },
        2: {
            1: cards["KC"],
            2: cards["KH"]
        }
    }

    let emptyBoard = {
        1: emptyCard,
        2: emptyCard,
        3: emptyCard,
        4: emptyCard,
        5: emptyCard
    }

    let equities = getHandEquity(hands, emptyBoard)
    let handOneEquity = equities[0]
    let handTwoEquity = equities[1]

    expect(+handOneEquity).toBeGreaterThanOrEqual(0.33)
    expect(+handOneEquity).toBeLessThanOrEqual(0.35)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.65)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.67)

    let board = { ...emptyBoard }
    board[1] = cards["5D"]
    board[2] = cards["4H"]
    board[3] = cards["7S"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    expect(+handOneEquity).toBeGreaterThanOrEqual(0.19)
    expect(+handOneEquity).toBeLessThanOrEqual(0.21)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.79)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.81)

    board[4] = cards["9C"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    expect(+handOneEquity).toBeGreaterThanOrEqual(0.06)
    expect(+handOneEquity).toBeLessThanOrEqual(0.08)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.92)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.94)

    board[5] = cards["KD"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    expect(+handOneEquity).toEqual(0)
    expect(+handTwoEquity).toEqual(1)

    board[5] = cards["AD"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    expect(+handOneEquity).toEqual(1)
    expect(+handTwoEquity).toEqual(0)

    hands[1][1] = cards["7H"]
    hands[1][2] = cards["6H"]
    hands[2][1] = cards["6C"]
    hands[2][2] = cards["5C"]

    board = { ...emptyBoard }
    board[1] = cards["7D"]
    board[2] = cards["QH"]
    board[3] = cards["KH"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    expect(+handOneEquity).toBeGreaterThanOrEqual(0.96)
    expect(+handOneEquity).toBeLessThanOrEqual(0.98)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.03)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.04)

    board[4] = cards["5S"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    expect(+handOneEquity).toBeGreaterThanOrEqual(0.97)
    expect(+handOneEquity).toBeLessThanOrEqual(0.98)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.02)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.03)

    board[5] = cards["5D"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    expect(+handOneEquity).toEqual(0)
    expect(+handTwoEquity).toEqual(1)
})

it('checks kickers correctly', () => {
    let handOneRanks = ['K', 'J', '6', '5', '4', '4', '2']
    let handTwoRanks = ['K', 'Q', '6', '5', '4', '4', '2']

    expect(checkKicker(handOneRanks, handTwoRanks)).toEqual(2)

    handOneRanks = ['A', 'J', '6', '5', '4', '4', '2']
    handTwoRanks = ['K', 'Q', '6', '5', '4', '4', '2']

    expect(checkKicker(handOneRanks, handTwoRanks)).toEqual(1)
})

