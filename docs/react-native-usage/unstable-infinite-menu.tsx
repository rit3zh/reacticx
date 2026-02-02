`import { View, StyleSheet, StatusBar } from "react-native";
import React, { type ReactElement } from "react";
import UnstableInfiniteMenu, {
  type IUnstableInfiniteMenu,
} from "@/components/organisms/unstable_infinite-menu";

const MENU_ITEMS: IUnstableInfiniteMenu[] = [
  {
    image:
      "https://i.pinimg.com/736x/22/1e/ae/221eae1af669db2d93cc2155c74371ff.jpg",
  },
  {
    image:
      "https://i.pinimg.com/736x/2c/d9/66/2cd96620a3a595e3e80e5ddf364fa162.jpg",
  },
  {
    image:
      "https://i.pinimg.com/736x/83/49/c2/8349c22cc5c73a6eddbf561a41c09fda.jpg",
  },
  {
    image:
      "https://i.pinimg.com/736x/08/0f/3c/080f3c1e3b8d4a4c020e72ed8ebe982b.jpg",
  },
];

export default function App<T extends React.FC>(): React.JSX.Element &
  ReactElement {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#000" />
      <View style={styles.container}>
        <IUnstableInfiniteMenu
          items={MENU_ITEMS}
          style={styles.menuContainer}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  menuContainer: {
    width: "100%",
    height: "100%",
  },
});
`;
