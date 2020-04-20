import ini from 'ini';
import os from 'os';
import path from 'path';
import { asyncDeleteFile, asyncReadFile, asyncWriteFile, cleanData, ConfigData } from './utils';

/**
 * Creates a configuration 'ini' file in the home directory
 * @param file - config file name
 * @param data - config object to save
 */
export async function createConfig(file: string, data: ConfigData): Promise<void> {
  return asyncWriteFile(file, ini.encode(data));
}

/**
 * Reads a configuration file from the home directory
 * @param name - config file name
 */
export async function readConfig(name: string): Promise<ConfigData> {
  const contents = await asyncReadFile(path.join(os.homedir(), name));
  return ini.decode(contents);
}

/**
 * Patches a configuration file with a partial update
 * @param file - config file name
 * @param data - partial update object
 */
export async function updateConfig(file: string, data: ConfigData): Promise<void> {
  const currentConfig = await readConfig(file);
  const newConfig = cleanData({ ...currentConfig, ...data });
  return createConfig(file, newConfig);
}

/**
 * Deletes a configuration file in the home directory
 * @param file - config file name
 */
export async function deleteConfig(file: string): Promise<void> {
  return asyncDeleteFile(file);
}
