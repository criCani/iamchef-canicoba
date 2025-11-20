import React from 'react'

type Props = {
  pricePerServing?: number
}

export const getCost = ({ pricePerServing }: Props): React.ReactElement | null => {
  if (!pricePerServing) return null
  if (pricePerServing < 3) return null

  return (
    <span className="cost-badge" style={{ background: '#FFF3CD', color: '#856404', padding: '0.25rem 0.5rem', borderRadius: 8 }}>
      💸 Costoso
    </span>
  )
}

export default getCost
