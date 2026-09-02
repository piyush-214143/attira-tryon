module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@reduxjs/toolkit|react-redux|redux|redux-persist|reselect|immer|@react-native-async-storage/async-storage)/)',
  ],
};
