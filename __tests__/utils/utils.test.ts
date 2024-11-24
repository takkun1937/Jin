import { formatDate } from '@/utils/utils';
import { expect, describe, it } from '@jest/globals';

describe('formatDate', () => {
  it('formats a given date correctly', () => {
    const date = new Date('2024-11-23'); // テスト対象の日付
    const formattedDate = formatDate(date);

    // 期待されるフォーマットで比較
    expect(formattedDate).toBe('2024年11月23日');
  });

  //   it('formats a leap year date correctly', () => {
  //     const date = new Date('2020-02-29'); // 閏年の日付
  //     const formattedDate = formatDate(date);

  //     expect(formattedDate).toBe('2020年2月29日');
  //   });

  //   it('formats a single-digit day and month correctly', () => {
  //     const date = new Date('2024-01-05'); // 1月5日
  //     const formattedDate = formatDate(date);

  //     expect(formattedDate).toBe('2024年1月5日');
  //   });
});
