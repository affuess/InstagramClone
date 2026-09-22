import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FeedScreen from '../screens/FeedScreen';
import CommentsScreen from '../screens/CommentsScreen';
import SearchScreen from '../screens/SearchScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import PickerScreen from '../screens/PickerScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import {
  FeedStackParamList,
  SearchStackParamList,
  CreateStackParamList,
} from '../types/navigation';

const FeedStack = createNativeStackNavigator<FeedStackParamList>();
function FeedStackScreen() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={FeedScreen} options={{ title: 'Feed' }} />
      <FeedStack.Screen name="Comments" component={CommentsScreen} options={{ title: 'Comment' }} />
      <FeedStack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'Profile' }} />
    </FeedStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator<SearchStackParamList>();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
      <SearchStack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'Profile' }} />
    </SearchStack.Navigator>
  );
}

const CreateStack = createNativeStackNavigator<CreateStackParamList>();
function CreateStackScreen() {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen name="Picker" component={PickerScreen} options={{ title: 'Choose media' }} />
      <CreateStack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: 'Creating a publication' }} />
    </CreateStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="FeedTab" component={FeedStackScreen} options={{ title: 'Feed' }} />
        <Tab.Screen name="SearchTab" component={SearchStackScreen} options={{ title: 'Search' }} />
        <Tab.Screen name="CreateTab" component={CreateStackScreen} options={{ title: 'Create' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}