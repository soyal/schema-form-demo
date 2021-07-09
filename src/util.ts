import { TFieldStatus } from '@/typings/form';

/**
 *
 * @param obj 任意对象
 * @param keyStr 以"."分割的key e.g "a.b.c"
 * 如有数据 var obj = { a: { b: { c: 1 } } } safeGet(obj, "a.b.c") => 1, safeGet(obj, "a.d") => null
 */
export function getValue(obj: any, keyStr: string) {
  const keyArr = keyStr.split('.');

  let result: any = obj;
  for (let key of keyArr) {
    result = _get(result, key);
  }

  return result;
}

function _get(obj: any, key: string) {
  try {
    return obj[key];
  } catch {
    return;
  }
}

/**
 *
 * @param obj 任意对象
 * @param keyStr  以"."分割的字符串 e.g: "a.b.c"
 * @param value   要设置的值，任意类型
 *
 * e.g setValue({}, "a.b.c", 3) => { a: { b: { c: 3 }} }
 * e.g setValue({}, "a.0.b", 3) => { a: [{ b: 3 }] }
 */
export function setValue(obj: any, keyStr: string, value: any) {
  const keyArr = keyStr.split('.');

  let parentNode = obj;
  for (let i = 0; i < keyArr.length; i++) {
    const key = keyArr[i];

    // 最后一个key
    if (i === keyArr.length - 1) {
      parentNode[key] = value;
    } else {
      // 如果parentNode[key]没值，需要根据下一位的key来将parentNode[key]设置为合适的值 array or object
      if (!parentNode[key]) {
        const nextKey = keyArr[i + 1];
        if (Number.isNaN(Number(nextKey))) {
          parentNode[key] = {};
        } else {
          parentNode[key] = [];
        }
      }
      parentNode = parentNode[key];
    }
  }
}

export function filterInvisibleFields(
  allFieldsValue: { [key: string]: any },
  fieldsStatus: TFieldStatus
): any {
  const allKeys = Object.keys(fieldsStatus);
  const result = {};
  allKeys.forEach((key) => {
    // key === "a.b.c.d"
    const fieldStatus = fieldsStatus[key];
    if (fieldStatus.visible) {
      const value = getValue(allFieldsValue, key);
      if (value !== undefined) {
        setValue(result, key, value);
      }
    }
  });

  return result;
}
