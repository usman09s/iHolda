import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from 'components/Header/Header';
import { CustomReferenceButton } from 'modules/requestReference/components/CustomReferenceButton';
import { useSettingActions } from '../hooks/useSettingsActions';
import CustomHeader from 'components/Header/CustomHeader';

const UsernameScreen = () => {
  const { handleUsernamePress } = useSettingActions();
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .matches(/^\S*$/, 'Username is not valid')
      .min(3, 'Username must be at least 3 characters')
      .max(15, 'Username must be at most 15 characters')
      .required('Username can not be empty'),
  });

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <CustomHeader showBackIcon centerComponent={<Text style={{ fontSize: 14 }}>Username</Text>} />
      <Formik
        initialValues={{ username: '' }}
        validationSchema={validationSchema}
        onSubmit={handleUsernamePress}
        validateOnChange={false}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{ flex: 1, justifyContent: 'space-between', marginVertical: 30 }}>
            <View>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: errors.username && touched.username ? 'red' : 'gray',
                  paddingTop: 5,
                  paddingBottom: 15,
                  borderRadius: 10,
                  paddingHorizontal: 16,
                }}
                placeholder="add your @username"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
              {errors.username && touched.username && (
                <Text style={{ color: 'red' }}>{errors.username}</Text>
              )}
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

export default UsernameScreen;
