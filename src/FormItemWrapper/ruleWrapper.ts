import { RuleObject } from 'rc-field-form/es/interface';
import { BaseRule } from '@/typings/schema';
import { SchemaFormInstance } from '@/useSchemaForm';

export default function ruleWrapper(rule: BaseRule, form: SchemaFormInstance) {
  const nRule: BaseRule = {
    ...rule,
  };

  if (typeof nRule.validator === 'function') {
    const oldFunc = nRule.validator;
    nRule.validator = (_, value: any) => {
      return oldFunc(_, value, {
        getFieldValue: form.rcForm.getFieldValue,
      });
    };
  }

  // 默认是onChange
  if (nRule.validateTrigger === undefined) {
    nRule.validateTrigger = 'onChange';
  }

  return nRule as RuleObject;
}
