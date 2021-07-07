import { FormItemSchema } from '../../../src/typings/schema';
import AtomSelect from '../../components/AtomSelect';

const schemaItem: FormItemSchema = {
  field: 'songVersion',
  label: '歌曲版本',
  component: {
    Element: AtomSelect,
    props: {
      options: [
        {
          label: '录音室',
          value: 'luyinshi',
        },
        {
          label: '混音',
          value: 'mix',
        },
        {
          label: '伴奏',
          value: 'banzou',
        },
      ],
    },
  },
};

export default schemaItem;
