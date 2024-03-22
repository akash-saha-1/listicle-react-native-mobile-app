import { CommonActions } from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    })
  );
}

// add other navigation functions as needed

export default {
  navigate,
  setTopLevelNavigator,
};
