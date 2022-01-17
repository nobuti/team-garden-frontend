process.on('unhandledRejection', (r) => console.log(r)); // eslint-disable-line no-console

module.exports = {
  roots: ['./'],
  collectCoverage: false,
  moduleDirectories: ['./node_modules', './src'],
  moduleNameMapper: {
    '\\.(css|less|sass)$': 'identity-obj-proxy',
    '\\.(png|svg|pdf|jpg|jpeg)$': '<rootDir>/src/config/tests/fileMock.js',
    '^~(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/config/tests/jest.js'],
  testPathIgnorePatterns: ['/node_modules/', './src/config/tests/'],
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
};
