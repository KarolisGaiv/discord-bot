import { Kysely } from 'kysely';
import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import { getTestDbInstance } from '../../../database/db-test';
import * as sprintService from '../services';
import type { DB } from '../../../database/types';

describe('Sprint Service', () => {
  let db: Kysely<DB>;

  beforeEach(async () => {
    db = getTestDbInstance();
    await db
      .insertInto('sprints')
      .values([
        { code: 'SP1', title: 'Sprint 1' },
        { code: 'SP2', title: 'Sprint 2' },
      ])
      .execute();
  });

  afterEach(async () => {
    await db.deleteFrom('sprints').execute();
  });

  it('should fetch all sprints', async () => {
    const sprints = await sprintService.findAllSprints(db);
    expect(sprints).toHaveLength(2);
  });

  it('should find a sprint by code', async () => {
    const sprint = await sprintService.findSprintByCode(db, 'SP2');
    expect(sprint).toEqual({ id: 2, code: 'SP2', title: 'Sprint 2' });
  });

  it('should throw an error if sprint not found by code', async () => {
    await expect(
      sprintService.findSprintByCode(db, 'SP3')
    ).rejects.toThrowError();
  });

  it('should find a sprint by title', async () => {
    const sprint = await sprintService.findSprintByTitle(db, 'Sprint 1');
    expect(sprint).toEqual({ id: 1, code: 'SP1', title: 'Sprint 1' });
  });

  it('should throw an error if sprint not found by title', async () => {
    await expect(
      sprintService.findSprintByTitle(db, 'Sprint 3')
    ).rejects.toThrowError();
  });

  it('should find a sprint by ID', async () => {
    const sprint = await sprintService.findSprintById(db, 1);
    expect(sprint).toEqual({ id: 1, code: 'SP1', title: 'Sprint 1' });
  });

  it('should return undefined if sprint not found by ID', async () => {
    const sprint = await sprintService.findSprintById(db, 999);
    expect(sprint).toBeUndefined();
  });

  it('should create a new sprint', async () => {
    const newSprint = await sprintService.createSprint(db, {
      code: 'SP3',
      title: 'Sprint 3',
    });
    expect(newSprint).toEqual(
      expect.objectContaining({ code: 'SP3', title: 'Sprint 3' })
    );
  });

  it('should update an existing sprint', async () => {
    const updatedSprint = await sprintService.update(db, 1, {
      title: 'Updated Sprint 1',
    });
    expect(updatedSprint).toEqual({
      id: 1,
      code: 'SP1',
      title: 'Updated Sprint 1',
    });
  });

  it('should remove a sprint', async () => {
    const deletedSprint = await sprintService.remove(db, 1);
    expect(deletedSprint).toEqual([{ id: 1, code: 'SP1', title: 'Sprint 1' }]);
    const allSprints = await db.selectFrom('sprints').selectAll().execute();
    expect(allSprints).toHaveLength(1);
  });
});
