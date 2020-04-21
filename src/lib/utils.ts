import fs from 'fs';
import os from 'os';
import path from 'path';
import { ConfigData } from './models';

/**
 * Promise-based async file read operation
 * @param file - absolute path of the file
 */
export function asyncReadFile(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(file), 'utf8', (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(content);
    });
  });
}

/**
 * Promise-based async file write operation
 * @param file - absolute path of the file
 * @param data - data to write in the file
 */
export function asyncWriteFile(file: string, data: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

/**
 * Promise-based async file delete operation
 * @param file - absolute path of the file
 */
export function asyncDeleteFile(file: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.unlink(file, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

/**
 * Removes every undefined or null value from the input data
 * @param data - the object which needs to be cleaned
 * @returns - the same object with the undefined/null props removed
 */
export function cleanData(data: ConfigData): ConfigData {
  return Object.keys(data).reduce((obj, key) => {
    if (data[key] != null) {
      return { ...obj, [key]: data[key] };
    }
    return obj;
  }, {});
}

/**
 * Returns the path of a file with home as parent dir
 * @param file - file name
 */
export function atHome(file: string): string {
  return path.join(os.homedir(), file);
}
