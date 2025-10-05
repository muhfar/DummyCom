import { ReactElement } from 'react';
import { Chip, useTheme } from 'react-native-paper';
import styles from './Category.styles';

type Props = {
  category?: string;
};

const CategoryPill = (props: Props): ReactElement => {
  const theme = useTheme();

  return (
    <Chip theme={theme} compact style={styles.categoryPill}>
      {props?.category?.toUpperCase()}
    </Chip>
  );
};

export default CategoryPill;
