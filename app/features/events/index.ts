import {EventEmitter} from 'eventemitter3';

export const AppEvents = {
  FORBIDDEN_ERROR: 'FORBIDDEN_ERROR',
} as const;

type AppEvents = (typeof AppEvents)[keyof typeof AppEvents];

export const eventEmitter = new EventEmitter<AppEvents>();
