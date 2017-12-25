// unicode suits
export const SPADES = '\u2660'
export const HEARTS = '\u2665'
export const DIAMONDS = '\u2666'
export const CLUBS = '\u2663'

export const suits = [
    SPADES,
    HEARTS,
    DIAMONDS,
    CLUBS
]

// HTML entities
const HTML_SPADES = 9824
const HTML_HEARTS = 9829
const HTML_DIAMONDS = 9830
const HTML_CLUBS = 9827

export const getSuitFromHTML = (entity) => {
    switch (entity) {
        case HTML_SPADES:
            return 'spades'
        case HTML_HEARTS:
            return 'hearts'
        case HTML_DIAMONDS:
            return 'diamonds'
        case HTML_CLUBS:
            return 'clubs'
        default:
            return ''
    }
}
