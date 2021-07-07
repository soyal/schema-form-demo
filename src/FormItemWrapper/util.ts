import { FormInstance } from 'rc-field-form';

/**
 * 根据name是否嵌套，决定是将全局formData还是嵌套formData返回
 */
export function getFormData(
  form: FormInstance,
  name: string | (string | number)[]
) {
  let formData = null;
  if (typeof name === 'string') {
    formData = form.getFieldsValue();
  } else {
    // 当在嵌套的子表单内时候，formData为子表单的内容
    const parentNamePath = name.slice(0, name.length - 1);
    formData = form.getFieldValue(parentNamePath);
  }

  return formData;
}
