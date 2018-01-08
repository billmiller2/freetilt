// suit shorthand constants for eq calculation
export const SPADES = 'S'
export const HEARTS = 'H'
export const DIAMONDS = 'D'
export const CLUBS = 'C'

export const suits = [
    SPADES,
    HEARTS,
    DIAMONDS,
    CLUBS
]

// unicode suits
export const UNICODE_SPADES = '\u2660'
export const UNICODE_HEARTS = '\u2665'
export const UNICODE_DIAMONDS = '\u2666'
export const UNICODE_CLUBS = '\u2663'

export const unicodeSuits = [
    UNICODE_SPADES,
    UNICODE_HEARTS,
    UNICODE_DIAMONDS,
    UNICODE_CLUBS
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
