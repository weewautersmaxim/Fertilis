import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";

export const activate = () => {
  activateKeepAwake();
};

export const deactivate = () => {
  deactivateKeepAwake();
};
