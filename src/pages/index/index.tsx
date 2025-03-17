import { GraphContainer } from './GraphContainer';
import styles from './index.less';
import { Panels } from './Panels';

export default function HomePage() {
  return (
    <div className={styles.editor}>
     <GraphContainer />

     <Panels />
    </div>
  );
}
