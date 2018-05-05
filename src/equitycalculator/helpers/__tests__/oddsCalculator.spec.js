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

    // [AS, KS], [KC, KH], []
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

    // [AS, KS], [KC, KH], [5D, 4H, 7S]
    expect(+handOneEquity).toBeGreaterThanOrEqual(0.19)
    expect(+handOneEquity).toBeLessThanOrEqual(0.21)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.79)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.81)

    board[4] = cards["9C"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    // [AS, KS], [KC, KH], [5D, 4H, 7S, 9C]
    expect(+handOneEquity).toBeGreaterThanOrEqual(0.06)
    expect(+handOneEquity).toBeLessThanOrEqual(0.08)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.92)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.94)

    board[5] = cards["KD"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    // [AS, KS], [KC, KH], [5D, 4H, 7S, 9C, KD]
    expect(+handOneEquity).toEqual(0)
    expect(+handTwoEquity).toEqual(1)

    board[5] = cards["AD"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    // [AS, KS], [KC, KH], [5D, 4H, 7S, 9C, AD]
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

    // [7H, 6H], [6C, 5C], [7D, QH, KH]
    expect(+handOneEquity).toBeGreaterThanOrEqual(0.96)
    expect(+handOneEquity).toBeLessThanOrEqual(0.98)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.03)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.04)

    board[4] = cards["5S"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    // [7H, 6H], [6C, 5C], [7D, QH, KH, 5S]
    expect(+handOneEquity).toBeGreaterThanOrEqual(0.97)
    expect(+handOneEquity).toBeLessThanOrEqual(0.98)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.02)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.03)

    board[5] = cards["5D"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    // [7H, 6H], [6C, 5C], [7D, QH, KH, 5S, 5D]
    expect(+handOneEquity).toEqual(0)
    expect(+handTwoEquity).toEqual(1)

    hands[1][1] = cards["AS"]
    hands[1][2] = cards["8H"]
    hands[2][1] = cards["KH"]
    hands[2][2] = cards["8D"]

    board = { ...emptyBoard }

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    // [AS, 8H], [KH, 8D], []
    expect(+handOneEquity).toBeGreaterThanOrEqual(0.75)
    expect(+handOneEquity).toBeLessThanOrEqual(0.76)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.24)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.25)

    board[1] = cards["8C"]
    board[2] = cards["8S"]
    board[3] = cards["AC"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    // [AS, 8H], [KH, 8D], [8C, 8S, AC]
    expect(+handOneEquity).toBeGreaterThanOrEqual(0.99)
    expect(+handOneEquity).toBeLessThanOrEqual(1)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.01)

    board[4] = cards["KC"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    // [AS, 8H], [KH, 8D], [8C, 8S, AC, KC]
    expect(+handOneEquity).toBeGreaterThanOrEqual(0.94)
    expect(+handOneEquity).toBeLessThanOrEqual(0.96)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.04)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.06)

    board[5] = cards["2H"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    // [AS, 8H], [KH, 8D], [8C, 8S, AC, KC, 2H]
    expect(+handOneEquity).toEqual(1)
    expect(+handTwoEquity).toEqual(0)

    hands[1][1] = cards["AS"]
    hands[1][2] = cards["KS"]
    hands[2][1] = cards["KH"]
    hands[2][2] = cards["KC"]

    board = { ...emptyBoard }

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    // [AS, KS], [KH, KC], []
    expect(+handOneEquity).toBeGreaterThanOrEqual(0.34)
    expect(+handOneEquity).toBeLessThanOrEqual(0.35)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.65)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.66)

    board[1] = cards["AD"]
    board[2] = cards["KD"]
    board[3] = cards["7S"]

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    // [AS, KS], [KH, KC], [AD, KD, 7S]
    expect(+handOneEquity).toBeGreaterThanOrEqual(0.13)
    expect(+handOneEquity).toBeLessThanOrEqual(0.14)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.86)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.87)
})

it('checks kickers correctly', () => {
    let handOneRanks = ['K', 'J', '6', '5', '4', '4', '2']
    let handTwoRanks = ['K', 'Q', '6', '5', '4', '4', '2']

    expect(checkKicker(handOneRanks, handTwoRanks)).toEqual(2)

    handOneRanks = ['A', 'J', '6', '5', '4', '4', '2']
    handTwoRanks = ['K', 'Q', '6', '5', '4', '4', '2']

    expect(checkKicker(handOneRanks, handTwoRanks)).toEqual(1)
})

