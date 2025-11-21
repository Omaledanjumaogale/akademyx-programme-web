import { expect, test, describe } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
    test('merges tailwind classes correctly', () => {
        const result = cn('px-2 py-1', 'bg-red-500', 'hover:bg-red-600')
        expect(result).toBe('px-2 py-1 bg-red-500 hover:bg-red-600')
    })

    test('handles conditional classes', () => {
        const result = cn('px-2', true && 'py-1', false && 'bg-red-500')
        expect(result).toBe('px-2 py-1')
    })

    test('merges conflicting tailwind classes (last wins)', () => {
        const result = cn('p-2', 'p-4')
        expect(result).toBe('p-4')
    })
})
