import { ReactElement } from 'react';
import { TextInput as TextInputPaper } from 'react-native-paper';
import type { Props } from './TextInput.types';
import { Controller, useFormContext } from 'react-hook-form';
import ErrorInput from '../ErrorInput';
import { View } from 'react-native';

const TextInput = (props: Props): ReactElement => {
  const formMethods = useFormContext();

  return (
    <Controller
      name={props.name}
      control={formMethods.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <TextInputPaper
            label={props.label}
            value={value}
            onChangeText={onChange}
            mode="outlined"
            placeholder={props.placeholder}
            error={!!error}
          />
          {error && <ErrorInput message={error.message} />}
        </View>
      )}
    />
  );
};

export default TextInput;
