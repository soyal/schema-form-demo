import { RuleObject } from 'rc-field-form/es/interface';
import { BaseRule, FormSchema } from '../typings/schema';
import { SchemaFormInstance } from '../useSchemaForm';

export default function ruleWrapper(
  rule: BaseRule,
  form: SchemaFormInstance,
  formSchema: FormSchema
) {
  const nRule: BaseRule = {
    ...rule,
  };

  if (typeof nRule.validator === 'function') {
    const oldFunc = nRule.validator;
    nRule.validator = (_, value: any) => {
      return Promise.resolve(oldFunc(
        _,
        value,
        {
          getFieldValue: form.rcForm.getFieldValue,
        },
        formSchema.dataStore
      ));
    };
  }

  // 默认是onChange
  if (nRule.validateTrigger === undefined) {
    nRule.validateTrigger = 'onChange';
  }

  return nRule as RuleObject;
}
