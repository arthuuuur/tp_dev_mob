import { StatusBar } from 'expo-status-bar';
// import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {RootSiblingParent} from "react-native-root-siblings";
import BottomNavBar from "./src/navigation/BottomNavBar";
// import {store} from "./src/store/config";

export default function App() {
  return (
      // <Provider store={store}>
        <RootSiblingParent>
          <NavigationContainer>
            <BottomNavBar/>
            <StatusBar/>
          </NavigationContainer>
        </RootSiblingParent>
      // </Provider>
  );
}
