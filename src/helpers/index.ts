/* eslint-disable prettier/prettier */

import * as moment from 'moment';
import { Characters, MomentUnit } from './constant';

export const generateCode = (length: number) => {
  let result = '';
  const charLength = Characters.length;

  for (let i = 0; i < length; i++) {
    result += Characters.charAt(Math.floor(Math.random() * charLength));
  }

  return result;
};

export const addDuration = (duration: any, unit: string) => {
  if (!MomentUnit.includes(unit)) return false;

  return moment().add(duration, unit);
};
