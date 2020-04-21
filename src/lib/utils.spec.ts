// tslint:disable:no-expression-statement
import test from 'ava';
import os from 'os';
import path from 'path';
import { atHome, cleanData } from './utils';

test('at home', t => {
  const file = '.foobar';
  const expectedPath = path.join(os.homedir(), file);
  t.is(expectedPath, atHome(file));
});

test('clean data', t => {
  const data = {
    prop1: 'foo',
    prop2: 'bar'
  };
  t.deepEqual(cleanData(data), data);
  const dirtyData = {
    prop1: 'foo',
    prop2: undefined,
    prop3: null
  };
  t.deepEqual(cleanData(dirtyData), { prop1: 'foo' });
});
