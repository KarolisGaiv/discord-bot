import type { ColumnType } from 'kysely';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export interface Messages {
  createdAt: Generated<string>;
  gifUrl: string;
  id: Generated<number>;
  message: string;
  sprintCode: string;
  username: string;
}

export interface DB {
  messages: Messages;
}
