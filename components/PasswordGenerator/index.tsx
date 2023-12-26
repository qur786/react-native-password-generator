import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {PasswordSchema, generatePasswordString} from './utils';

export function PasswedGenerator() {
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Password Generator</Text>
        <Formik
          initialValues={{
            passwordLength: '',
            isLowerCase: true,
            isUpperCase: false,
            isSymbols: false,
            isNumbers: false,
          }}
          validationSchema={PasswordSchema}
          onSubmit={values => {
            console.log(values);
            const generatedPassword = generatePasswordString({
              ...values,
              passwordLength: Number.parseInt(values.passwordLength, 10),
            });

            setPassword(generatedPassword);
          }}>
          {({
            handleChange,
            values,
            touched,
            errors,
            handleSubmit,
            handleReset,
            setFieldValue,
          }) => (
            <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Password Length</Text>
                  {touched.passwordLength === true &&
                  typeof errors.passwordLength === 'string' ? (
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  ) : undefined}
                </View>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={handleChange('passwordLength')}
                  value={values.passwordLength}
                  placeholder="example: 8"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Choose Lowercase</Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={values.isLowerCase}
                  onPress={() =>
                    setFieldValue('isLowerCase', !values.isLowerCase)
                  }
                  fillColor="#67E6DC"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Choose Uppercase</Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={values.isUpperCase}
                  onPress={() =>
                    setFieldValue('isUpperCase', !values.isUpperCase)
                  }
                  fillColor="#25CCF7"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Choose Symbols</Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={values.isSymbols}
                  onPress={() => setFieldValue('isSymbols', !values.isSymbols)}
                  fillColor="#badc57"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Choose Numbers</Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={values.isNumbers}
                  onPress={() => setFieldValue('isNumbers', !values.isNumbers)}
                  fillColor="#E74292"
                />
              </View>
              <View style={styles.formActions}>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryBtn}>
                  <Text
                    style={styles.secondaryBtnTxt}
                    onPress={() => {
                      handleReset();
                      setPassword('');
                    }}>
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
      {password.length > 0 ? (
        <View style={[styles.card, styles.cardElevated]}>
          <Text style={styles.subTitle}>Result:</Text>
          <Text style={styles.description}>Long press to copy</Text>
          <Text style={styles.generatedPassword} selectable>
            {password}
          </Text>
        </View>
      ) : undefined}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingVertical: 12,
    rowGap: 20,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});
