import {
    checkKicker
} from '../oddsCalculator'

it('checks kickers correctly', () => {
    let handOneRanks = ['K', 'J', '6', '5', '4', '4', '2']
    let handTwoRanks = ['K', 'Q', '6', '5', '4', '4', '2']

    expect(checkKicker(handOneRanks, handTwoRanks)).toEqual(2)

    handOneRanks = ['A', 'J', '6', '5', '4', '4', '2']
    handTwoRanks = ['K', 'Q', '6', '5', '4', '4', '2']

    expect(checkKicker(handOneRanks, handTwoRanks)).toEqual(1)
})

