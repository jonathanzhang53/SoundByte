module.exports = {
    clearMocks: true,
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/common/testMocks/fileMock.js',
        '\\.(css|less)$': '<rootDir>/src/common/testMocks/styleMock.js',
    },

    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },

    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/index.js", "!src/reportWebVitals.js", "!src/setupTests.js", "!src/App.js"],

    verbose: true,
};