import { FormItemSchema } from '../../../src/typings/schema';
import AtomSelect from '../../components/AtomSelect';

const schemaItem: FormItemSchema = {
  field: 'songType',
  label: '歌曲类型',
  component: {
    Element: AtomSelect,
    props: {
      options: [
        {
          label: '原创',
          value: 'origin',
        },
        {
          label: '翻唱',
          value: 'fanchang',
        },
      ],
    },
  },
};

export default schemaItem;
