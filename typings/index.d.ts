/**
 * @public
 */
export type FileExtension = 'js' | 'ts';

/**
 * @public
 */
export type EnvOptions = { src: string, ext: FileExtension };

/**
 * @public
 */
export type DirectoryOptions = { path: string, depth?: number | null };
