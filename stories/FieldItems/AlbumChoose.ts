import { FormItemSchema } from '../../src/typings/schema';
import AutoSelect from '../components/AtomSelect';

const schemaItem: FormItemSchema = {
  label: '专辑上传',
  field: 'albumId',
  component: {
    Element: AutoSelect,
    props: {
      options: [
        { label: '专辑1', value: 'album1' },
        { label: '专辑2', value: 'album2' },
      ],
    },
  },
};

export default schemaItem;
