import type Types from '../../typings';

type Callback<T, R> = (element: T, index: number, arr: T[]) => Promise<R> | R;

export default class AsyncUtil implements Types.AsyncUtil {
  static async every<T = unknown>(arr: T[], callback: Callback<T, boolean>) {
    // eslint-disable-next-line no-async-promise-executor
    const promise = new Promise<boolean>(async (resolve) => {
      let i = 0;
      for await (const item of arr) {
        const value = await callback(item, i, arr);
        if (!value) resolve(false);
        i += 1;
      }

      resolve(true);
    });

    return promise;
  }

  static async some<T = unknown>(arr: T[], callback: Callback<T, boolean>) {
    // eslint-disable-next-line no-async-promise-executor
    const promise = new Promise<boolean>(async (resolve) => {
      let i = 0;
      for await (const item of arr) {
        const value = await callback(item, i, arr);
        if (value) resolve(true);
        i += 1;
      }

      resolve(false);
    });

    return promise;
  }
}
