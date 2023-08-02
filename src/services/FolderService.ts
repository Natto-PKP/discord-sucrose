import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';
import type Types from '../../typings/old.index';

export default class FolderService implements Types.FolderService {
  static search(options: {
    path: string,
    filter: { type: 'folder' | 'file', ext: string },
    nameOnly?: boolean,
    fileNameOnly?: boolean,
    depth?: number | null,
    autoExcludeFileOnRecursive?: boolean,
  }): string[] {
    if (!existsSync(options.path) || !lstatSync(options.path).isDirectory()) return [];

    // # init
    let results = [] as string[];
    const folders = [] as string[];
    const files = [] as string[];

    // # get all files and folders
    readdirSync(options.path).forEach((doc) => {
      if (doc.startsWith('_')) return;
      const to = path.join(options.path, doc);

      if (lstatSync(to).isDirectory()) folders.push(to);
      else if (lstatSync(to).isFile() && to.endsWith(options.filter.ext)) files.push(to);
    });

    // # push to results
    if (options.filter.type === 'file') results.push(...files);
    if (options.filter.type === 'folder') results.push(...folders);

    if (options.nameOnly) results = results.map((p) => path.basename(p, `.${options.filter.ext}`));
    else if (options.fileNameOnly) results = results.map((p) => path.basename(p));

    // # remove all folders with the name of a files
    if (options.filter.type === 'file' && options.autoExcludeFileOnRecursive) {
      files.forEach((file) => {
        const index = folders.findIndex((folder) => path.basename(file, `.${options.filter.ext}`) === path.basename(folder));
        if (index >= 0) folders.splice(index, 1);
      });
    }

    // # if options depth activate, loop and open all folders
    if (options.depth && options.depth > 0 && folders.length) {
      folders.forEach((folder) => {
        const opts = options;
        opts.path = folder;

        const data = FolderService.search({
          ...opts,
          depth: options.depth ? options.depth - 1 : null,
        });

        results.push(...data);
      });

      // # return results
      return results;
    } return results;
  }
}
