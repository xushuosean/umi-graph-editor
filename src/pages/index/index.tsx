import { register } from '@/graphic/graph-react-shape/register';
import { GraphContainer } from './GraphContainer';
import styles from './index.less';
import { Tec } from './Tec';

register({
  shape: 'tec',
  component: Tec
})

export default function HomePage() {
  return (
    <div className={styles.editor}>
      <GraphContainer />
    </div>
  );
}
