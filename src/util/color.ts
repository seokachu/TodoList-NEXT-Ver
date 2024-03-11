const COLOR = ['ebebeb', 'a9c4fc', '9df3fe', 'fff199', 'ffbfc0', 'a6ff9e'];

export const randomCardColor = (): string => {
  const random = Math.floor(Math.random() * COLOR.length);
  return `#${COLOR[random]}`;
};
