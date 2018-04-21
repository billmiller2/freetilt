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

it('calculates hand equities correctly', () => {
    const AS = {
        rank: "A",
        suit: UNICODE_SPADES
    }
    const KS = {
        rank: "K",
        suit: UNICODE_SPADES
    }
    const KC = {
        rank: "K",
        suit: UNICODE_CLUBS
    }
    const KH = {
        rank: "K",
        suit: UNICODE_HEARTS
    }
    const emptyCard = {
        rank: "",
        suit: ""
    }
    let hands = {
        1: {
            1: AS,
            2: KS
        },
        2: {
            1: KC,
            2: KH
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

    const fiveD = {
        rank: "5",
        suit: UNICODE_DIAMONDS
    }
    const fourH = {
        rank: "4",
        suit: UNICODE_HEARTS
    }
    const sevenS = {
        rank: "7",
        suit: UNICODE_SPADES
    }
    let board = { ...emptyBoard }
    board[1] = fiveD
    board[2] = fourH
    board[3] = sevenS

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    expect(+handOneEquity).toBeGreaterThanOrEqual(0.19)
    expect(+handOneEquity).toBeLessThanOrEqual(0.21)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.79)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.81)

    const nineC = {
        rank: "9",
        suit: UNICODE_CLUBS
    }

    board[4] = nineC

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    expect(+handOneEquity).toBeGreaterThanOrEqual(0.06)
    expect(+handOneEquity).toBeLessThanOrEqual(0.08)

    expect(+handTwoEquity).toBeGreaterThanOrEqual(0.92)
    expect(+handTwoEquity).toBeLessThanOrEqual(0.94)

    const KD = {
        rank: "K",
        suit: UNICODE_DIAMONDS
    }

    board[5] = KD

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    expect(+handOneEquity).toEqual(0)
    expect(+handTwoEquity).toEqual(1)

    const AD = {
        rank: "A",
        suit: UNICODE_DIAMONDS
    }

    board[5] = AD

    equities = getHandEquity(hands, board)
    handOneEquity = equities[0]
    handTwoEquity = equities[1]

    expect(+handOneEquity).toEqual(1)
    expect(+handTwoEquity).toEqual(0)
})

it('checks kickers correctly', () => {
    let handOneRanks = ['K', 'J', '6', '5', '4', '4', '2']
    let handTwoRanks = ['K', 'Q', '6', '5', '4', '4', '2']

    expect(checkKicker(handOneRanks, handTwoRanks)).toEqual(2)

    handOneRanks = ['A', 'J', '6', '5', '4', '4', '2']
    handTwoRanks = ['K', 'Q', '6', '5', '4', '4', '2']

    expect(checkKicker(handOneRanks, handTwoRanks)).toEqual(1)
})

