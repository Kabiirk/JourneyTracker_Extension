import '@testing-library/jest-dom';
// @ts-ignore
declare var global: {
  chrome: {
    runtime: {
      sendMessage: jest.Mock<any, any>,
      onMessage: {
        addListener: jest.Mock<any, any>
      }
    },
    storage: {
      local: {
        get: jest.Mock<any, any>,
        set: jest.Mock<any, any>,
        remove: jest.Mock<any, any>
      }
    }
  }
};

global.chrome = {
  runtime: {
    sendMessage: jest.fn(),
    onMessage: {
      addListener: jest.fn()
    }
  },
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn()
    }
  }
};
