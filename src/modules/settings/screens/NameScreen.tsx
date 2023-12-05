import React from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { useSettingActions } from '../hooks/useSettingsActions';
import CustomHeader from 'components/Header/CustomHeader';

const NameScreen = () => {
  const { handleNamePress } = useSettingActions();
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z\s]+$/, 'Name is not valid (only letters are allowed)')
      .min(3, 'Name must be at least 3 characters')
      .max(20, 'Name must be at most 20 characters')
      .required('Name can not be empty'),
  });

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <CustomHeader showBackIcon centerComponent={<Text style={{ fontSize: 14 }}>Name</Text>} />
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={handleNamePress}
        validateOnChange={false}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{ flex: 1, justifyContent: 'space-between', marginVertical: 30 }}>
            <View>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: errors.name && touched.name ? 'red' : 'gray',
                  paddingTop: 5,
                  paddingBottom: 15,
                  borderRadius: 10,
                  paddingHorizontal: 16,
                }}
                placeholder="add your name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {errors.name && touched.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
            </View>
            <CustomReferenceButton
              customContainerClass="bg-black w-48 self-center"
              extraStyles={{ borderWidth: 0, marginBottom: 16 }}
              title="Done"
              customTextClass="text-white"
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default NameScreen;
