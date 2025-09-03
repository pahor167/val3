export const selectRandomWinner = (participantIds: string[]): string | null => {
  if (participantIds.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * participantIds.length);
  return participantIds[randomIndex];
};

export const checkEligibility = (
  userAge: number,
  userHairColor: string,
  competitionType: 'age' | 'hairColor',
  criteria: string | number
): boolean => {
  if (competitionType === 'age') {
    const [minAge, maxAge] = criteria.toString().split('-').map(Number);
    return userAge >= minAge && userAge <= maxAge;
  } else {
    return userHairColor === criteria;
  }
};

export const generateAgeRanges = () => [
  '18-25',
  '26-35',
  '36-45',
  '46-55',
  '56-65',
  '66+',
];
