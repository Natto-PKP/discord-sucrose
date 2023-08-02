import { lstatSync, readdirSync } from 'fs';
import path from 'path';
import type { FileExtension } from '../../typings';

/**
 * The PathUtil class
 * @class PathUtil
 * @public
 */
export default class PathUtil {
  static async getPaths(
    options: {
      folder: string;
      fileExtension: FileExtension;
      ignoreFolderWithFileName?: boolean;
      deep: number
    },
  ) {
    const files = <string[]>[];
    const recursives = <string[]>[];

    // # Loop all files in the directory
    await Promise.all(readdirSync(options.folder).map(async (file) => {
      // # If the file is a file and ends with the file extension, push it to the files array
      if (lstatSync(path.join(options.folder, file)).isFile() && file.endsWith(`.${options.fileExtension}`)) {
        files.push(path.join(options.folder, file));
        // # If the file is a directory and the deep is more than 0, search files in the directory
      } else if (lstatSync(path.join(options.folder, file)).isDirectory() && options.deep > 0) {
        if (options.ignoreFolderWithFileName) {
          const exist = files.some((result) => result.endsWith(`${file}.${options.fileExtension}`));
          if (exist) return null; // don't return anything
        }

        const newResults = await PathUtil.getPaths({
          ...options,
          folder: path.join(options.folder, file),
          deep: options.deep - 1,
        });

        recursives.push(...newResults);
      }

      return null; // don't return anything
    }));

    return [...files, ...recursives]; // merge the files and recursives array
  }
}
