import { StackScreenProps } from "@react-navigation/stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      "auth/login": undefined;
      "auth/register": undefined;
      "(tabs)": undefined;
      "home": undefined;
      "home/details": { id: string };
      "profile": undefined;
      "profile/settings": undefined;
    }
  }
}
