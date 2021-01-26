module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '.(ts|tsx)': 'babel-jest',
  },
  testPathIgnorePatterns: ['/.next/', '/node_modules/'],
}
