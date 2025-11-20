export const getDifficulty = (readyInMinutes: number): string => {
  if (readyInMinutes <= 15) return 'Very Easy'
  if (readyInMinutes <= 30) return 'Easy'
  if (readyInMinutes <= 60) return 'Middle'
  return 'Impegnativa'
}
