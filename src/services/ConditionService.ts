import type Types from '../../typings';

import AsyncUtil from '../utils/AsyncUtil';

export default class ConditionService implements Types.ConditionService {
  static async isAlright<P = { [key: string]: any }>(params: P & {
    sucrose: Types.Sucrose,
    conditions: Types.Condition<P>[] | Types.Condition<P>,
  }): Promise<boolean> {
    return AsyncUtil.every(
      Array.isArray(params.conditions) ? params.conditions : [params.conditions],
      (_, i, arr) => arr[i].callback(params) as Promise<boolean>,
    );
  }
}
