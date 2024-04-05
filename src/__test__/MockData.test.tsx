import { mockData } from '../data/mockData';

describe('Mock Data', () => {
  test('mockData array is defined', () => {
    expect(mockData).toBeDefined();
  });

  test('mockData array is not empty', () => {
    expect(mockData.length).toBeGreaterThan(0);
  });

  test('Each object in mockData array has id, text, and url properties', () => {
    mockData.forEach(data => {
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('text');
      expect(data).toHaveProperty('url');
    });
  });
});
