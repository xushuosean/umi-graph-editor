import { GraphContainer } from './GraphContainer';
import styles from './index.less';

export default function HomePage() {
  return (
    <div className={styles.editor}>
     <GraphContainer />
    </div>
  );
}
