import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import Home from "../components/Home";
import { createStackNavigator } from "@react-navigation/stack";
import MovieDetails from "../components/MovieDetails";
import FavoriteMovies from "../components/WatchedMovies";

const { Navigator, Screen } = createBottomTabNavigator();
const SearchNavigation = createStackNavigator();
const FavNavigation = createStackNavigator();

const EyeIcon = (props) => (
  <Icon {...props} name="eye" pack="feather" width={24} height={24} />
);

const SearchIcon = (props) => (
  <Icon {...props} name="search" pack="feather" width={24} height={24} />
);

function searchStackScreens() {
  return (
    <SearchNavigation.Navigator initialRouteName="ViewSearch">
      <SearchNavigation.Screen
        name="ViewSearch"
        component={Home}
        options={{ title: "Home" }}
      />
      <SearchNavigation.Screen
        name="ViewMovieDetail"
        component={MovieDetails}
        options={{ title: "Film" }}
      />
    </SearchNavigation.Navigator>
  );
}

function favStackScreens() {
  return (
    <FavNavigation.Navigator initialRouteName="ViewWatchedMovies">
      <FavNavigation.Screen
        name="ViewWatchedMovies"
        component={FavoriteMovies}
        options={{ title: "Films vus" }}
      />
      <FavNavigation.Screen
        name="ViewMovieDetail"
        component={MovieDetails}
        options={{ title: "Film" }}
      />
    </FavNavigation.Navigator>
  );
}

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Search" icon={SearchIcon} />
    <BottomNavigationTab title="Watched" icon={EyeIcon}>
      
    </BottomNavigationTab>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator
    initialRouteName="Tab Recherche"
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Screen name="Tab Recherche" component={searchStackScreens} />
    <Screen name="Tab Vus" component={favStackScreens} />
  </Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default AppNavigator;
