import { Kysely } from 'kysely';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getTestDbInstance } from '../../../database/db-test'; 
import * as templateService from '../services';
import type { DB } from '../../../database/types';

describe('Template Service', () => {
  let db: Kysely<DB>;

  beforeEach(async () => {
    db = getTestDbInstance();
    await db.insertInto('templates').values([
      { text: 'Template 1' },
      { text: 'Template 2' },
    ]).execute();
  });

  afterEach(async () => {
    await db.deleteFrom('templates').execute();
  });

  it('should find a template by ID', async () => {
    const template = await templateService.findTemplateById(db, 1);
    expect(template).toEqual({ id: 1, text: 'Template 1' });
  });

  it('should throw an error if template not found by ID', async () => {
    await expect(templateService.findTemplateById(db, 999)).rejects.toThrowError();
  });

  it('should find a template by text', async () => {
    const template = await templateService.findTemplateByText(db, 'Template 2');
    expect(template).toEqual({ id: 2, text: 'Template 2' });
  });

  it('should throw an error if template not found by text', async () => {
    await expect(templateService.findTemplateByText(db, 'Nonexistent Template')).rejects.toThrowError();
  });

  it('should create a new template', async () => {
    const newTemplate = await templateService.createTemplate(db, { text: 'New Template' });
    expect(newTemplate).toEqual(expect.objectContaining({ text: 'New Template' }));
  });

  it('should update an existing template', async () => {
    const updatedTemplate = await templateService.update(db, 1, { text: 'Updated Template' });
    expect(updatedTemplate).toEqual({ id: 1, text: 'Updated Template' });
  });

  it('should remove a template', async () => {
    const deletedTemplate = await templateService.remove(db, 1);
    expect(deletedTemplate).toEqual([{ id: 1, text: 'Template 1' }]);
    const allTemplates = await db.selectFrom('templates').selectAll().execute();
    expect(allTemplates).toHaveLength(1); 
  });

  it('should return a random template text', async () => {
    const randomTemplateText = await templateService.getRandomTemplate(db);
    expect(['Template 1', 'Template 2']).toContain(randomTemplateText); 
  });
});
