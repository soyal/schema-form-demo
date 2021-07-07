import { FormItemSchema } from '../../../src/typings/schema';
import AutoInput from '../../components/AtomInput';

const schemaItem: FormItemSchema = {
  label: '歌曲名',
  field: 'songName',
  visible: (value, formData: any) => {
    console.log('123')
    return formData['songType'] !== 'fanchang'
  },
  component: {
    Element: AutoInput,
    props: {
      placeholder: '歌曲名字'
    }
  },
};

export default schemaItem;
