import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScoreStats } from '../components/ScoreStats'

describe('ScoreStats', () => {
  test('shows statistics', () => {
    render(
      <ScoreStats
        highest={95}
        lowest={45}
        average={78}
        passing={3}
        total={4}
      />
    )

    expect(screen.getByText('Passing: 3 of 4')).toBeTruthy()
  })

  test('updates when props change', () => {
    const { rerender } = render(
      <ScoreStats
        highest={90}
        lowest={50}
        average={70}
        passing={2}
        total={3}
      />
    )

    rerender(
      <ScoreStats
        highest={100}
        lowest={40}
        average={80}
        passing={4}
        total={5}
      />
    )

    expect(screen.getByText('Passing: 4 of 5')).toBeTruthy()
  })
})