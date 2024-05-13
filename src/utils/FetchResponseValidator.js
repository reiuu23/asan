import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export const apiResponseValidator = apiResponse => {
  const {
    data: {validationType},
  } = apiResponse;
  const validationFilter = validationType.toLowerCase();

  // Test Block

  try {
    if (validationFilter === 'auth') {
      return authValidator(apiResponse);
    } else if (validationFilter === 'testblock') {
      return testFunction(apiResponse);
    } else {
      return 'Invalid validation type parameters.';
    }
  } catch (error) {
    return error;
  }
};

export const authValidator = apiResponse => {
  const {
    data: {validationType, email, password, authStatus},
    status,
  } = apiResponse;
  const token = uuidv4();

  if (status === 200) {
    if (authStatus) {
      return {
        validationType: validationType,
        email: email,
        password: password,
        userToken: token,
      };
    } else {
      return 'You have entered an invalid credential';
    }
  } else {
    return 'Encountered an error while authenticating the user in the server! (Possibly an error in processing the authentication)';
  }
};

// export const testFunction = apiResponse => {
//   return apiResponse;
// };
