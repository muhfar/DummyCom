import { ReactElement } from 'react';
import { Image, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import type { Props } from './ReloadScreen.types';
import styles from './ReloadScreen.styles';
import { error } from '../../Assets';

const ReloadScreen = (props: Props): ReactElement => {
  const title = props.title || 'Something went wrong';
  const description =
    props.description ||
    'Our team will looking into it. Please try again later.';

  return (
    <Card style={styles.container}>
      <Image source={error} alt="Reload Image" style={styles.reloadImage} />
      <Card.Content style={styles.contentContainer}>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodyMedium" numberOfLines={2}>
          {description}
        </Text>
      </Card.Content>
      <Button mode="contained" onPress={props.onReload}>
        Reload
      </Button>
    </Card>
  );
};

export default ReloadScreen;
