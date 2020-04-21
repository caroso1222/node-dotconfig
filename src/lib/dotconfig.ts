import ini from 'ini';
import { ConfigData } from './models';
import { asyncDeleteFile, asyncReadFile, asyncWriteFile, atHome, cleanData } from './utils';

/**
 * Creates a configuration 'ini' file in the user's home directory.
 *
 * Example:
 * ```
 * import { createConfig } from 'node-dotconfig';
 *
 * async function main() {
 *  await createConfig('.my-app', { name: 'john', lastname: 'doe' });
 * }
 * ```
 * @param file config file name
 * @param data - config object to save
 */
export async function createConfig(file: string, data: ConfigData): Promise<void> {
  return asyncWriteFile(atHome(file), ini.encode(data));
}

/**
 * Loads a configuration file from the user's home directory.
 *
 * Example:
 * ```typescript
 * import { readConfig } from 'node-dotconfig';
 *
 * async function main() {
 *  const config = await readConfig('.my-app');
 *  console.log(config.name);
 * }
 * ```
 *
 * Throws exception on file not found
 * @param name - config file name
 */
export async function readConfig(name: string): Promise<ConfigData> {
  const contents = await asyncReadFile(atHome(name));
  return ini.decode(contents);
}

/**
 * Patches a configuration file with a partial update
 *
 * Example:
 * ```
 * import { updateConfig } from 'node-dotconfig';
 *
 * async function main() {
 *  await updateConfig('.my-app', { lastname: 'einstein' });
 * }
 * ```
 *
 * Throws exception on file not found
 * @param file - config file name
 * @param data - partial update object
 */
export async function updateConfig(file: string, data: ConfigData): Promise<void> {
  const currentConfig = await readConfig(file);
  const newConfig = cleanData({ ...currentConfig, ...data });
  return createConfig(file, newConfig);
}

/**
 * Deletes a configuration file in the user's home directory
 *
 * Example:
 *
 * ```
 * import { deleteConfig } from 'node-dotconfig';
 *
 * async function main() {
 *  await deleteConfig('.my-app');
 * }
 * ```
 * Throws exception on file not found
 * @param file - config file name
 */
export async function deleteConfig(file: string): Promise<void> {
  return asyncDeleteFile(atHome(file));
}
