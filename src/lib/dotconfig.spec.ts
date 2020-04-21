// tslint:disable:no-expression-statement
import test from 'ava';
import fs from 'fs';
import { createConfig, deleteConfig, readConfig, updateConfig } from './dotconfig';
import { atHome } from './utils';

const CONFIG_FILES = {
  DEFAULT: '.dotconfigspec',
  DELETE: '.deletedotconfigspec',
  INVALID: '',
  NON_EXISTENT: '.mockdotconfigspec',
  UPDATE: '.updatedotconfigspec'
};

test('read non existent config', async t => {
  const op = readConfig(CONFIG_FILES.NON_EXISTENT);
  await t.throwsAsync(op);
});

test('delete config', async t => {
  await createConfig(CONFIG_FILES.DELETE, {});
  const op = deleteConfig(CONFIG_FILES.DELETE);
  await t.notThrowsAsync(op);
});

test('delete non existent config', async t => {
  const op = deleteConfig(CONFIG_FILES.NON_EXISTENT);
  await t.throwsAsync(op);
});

test('create and read config', async t => {
  const data = {
    baz: 'nom',
    nested: {
      foo: 'bar'
    }
  };
  const op = createConfig(CONFIG_FILES.DEFAULT, data);
  await t.notThrowsAsync(op);
  const config = await readConfig(CONFIG_FILES.DEFAULT);
  t.deepEqual(config, data);
});

test('update config', async t => {
  const data = {
    prop1: 'foo',
    prop2: 'bar',
    prop3: 'baz'
  };
  const dataPatch = { prop3: 'nom' };
  await createConfig(CONFIG_FILES.UPDATE, data);
  const op = updateConfig(CONFIG_FILES.UPDATE, dataPatch);
  await t.notThrowsAsync(op);
  const config = await readConfig(CONFIG_FILES.UPDATE);
  t.deepEqual(config, { ...data, ...dataPatch });
});

test('create invalid config', async t => {
  const op = createConfig(CONFIG_FILES.INVALID, {});
  await t.throwsAsync(op);
});

test.after('cleanup', () => {
  Object.values(CONFIG_FILES)
    .filter(Boolean)
    .map(atHome)
    .filter(fs.existsSync)
    .forEach(fs.unlinkSync);
});
