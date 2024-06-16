import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import * as sprintsService from '../services';
import db from '../../../database/index';

describe('sprintsService', () => {
  beforeEach(() => {
    // Mock the database instance
    vi.mock('../../../database/index', () => ({
      default: {
        selectFrom: vi.fn().mockReturnThis(),
        selectAll: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        execute: vi.fn(),
        executeTakeFirstOrThrow: vi.fn(),
      },
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('findAllSprints', () => {
    it('should return all sprints', async () => {
      const mockSprints = [
        { id: 1, code: 'SPR1', title: 'Sprint 1' },
        { id: 2, code: 'SPR2', title: 'Sprint 2' },
      ];

      // Mock the database response
      db.execute.mockResolvedValue(mockSprints);

      const sprints = await sprintsService.findAllSprints();

      expect(sprints).toEqual(mockSprints);
      expect(db.selectFrom).toHaveBeenCalledWith('sprints');
      expect(db.selectAll).toHaveBeenCalled();
      expect(db.execute).toHaveBeenCalled();
    });
  });
});
