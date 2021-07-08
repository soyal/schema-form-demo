import { FormItemSchema } from '../../../../src/typings/schema';
import AutoInput from '../../components/AtomInput';

const schemaItem: FormItemSchema = {
  label: '歌曲名',
  field: 'songName',
  dependencies: ['songType'],
  visible: (value, formData: any) => {
    return formData['songType'] !== 'fanchang'
  },
  disabled: (value, formData: any) => {
    return formData['songType'] !== 'origin'
  },
  component: {
    Element: AutoInput,
    props: {
      placeholder: '歌曲名字'
    }
  },
};

export default schemaItem;
