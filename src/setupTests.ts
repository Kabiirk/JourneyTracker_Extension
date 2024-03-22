import '@testing-library/jest-dom';


global.chrome = {
  runtime: {
    sendMessage: jest.fn(),
    // @ts-ignore
    onMessage: {
      addListener: jest.fn()
    }
  },
  storage: {
    // @ts-ignore
    local: {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn()
    }
  }
};
