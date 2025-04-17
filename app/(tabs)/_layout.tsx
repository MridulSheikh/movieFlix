import { View, Text, ImageBackground, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const tabData = [
  {
    name: "index",
    title: "Home",
    icon: icons.home,
  },
  {
    name: "search",
    title: "Search",
    icon: icons.search,
  },
  {
    name: "profile",
    title: "Profile",
    icon: icons.person,
  },
  {
    name: "saved",
    title: "Saved",
    icon: icons.save,
  },
];

const TabIcon = ({ focused, icon, title }: {focused: boolean, icon: ImageSourcePropType, title: string}) => {
  if (focused) {
    return(
      <ImageBackground
      source={images.highlight}
      style={{
        minHeight: 50,
        minWidth: 114,
        width: "100%",
        height: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        overflow: "hidden",
        marginTop: 13,
      }}
    >
      <Image source={icon} tintColor={"#151312"} className="size-5" />
      <Text className=" text-secondary text-base font-semibold ml-2">
        {title}
      </Text>
    </ImageBackground>
    )
  }
  return (
    <View className=" size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor={"#ABB5DB"} className="size-5" />
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs
    screenOptions={{
      tabBarShowLabel: false,
      tabBarItemStyle: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      },
      tabBarStyle: {
        backgroundColor: "#0f0D23",
        borderRadius: 50,
        marginHorizontal: 20,
        marginBottom: 36,
        height: 52,
        position: "absolute",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#0f0D23", 
      }
    }}
    >
      {tabData.map((dt) => (
        <Tabs.Screen
          key={dt.name}
          name={dt.name}
          options={{
            title: dt.title,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={dt.icon} title={dt.title} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
