import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeTopNavigator from '../../navigator/HomeTopNavigator';
import GlobalStyles from '../../res/styles/GlobalStyles';
import NavigationBar from '../../components/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus';
import NavigationUtil from '../../navigator/NavigationUtil';

const tabs = [
  {
    label: '推荐',
    name: 'Recommend',
  },
  {
    label: '歌手',
    name: 'Singer',
  },
  {
    label: '排行版',
    name: 'Ranking',
  },
];

function HomePage(props) {
  NavigationUtil.navigation = props.navigation;

  const [tabActive, setTabActive] = useState(0);

  const handleTabChange = index => {
    setTabActive(index);
    props.navigation.navigate(tabs[index].name);
  };

  const renderNavigationBar = () => {
    let statusBar = {
      backgroundColor: GlobalStyles.themeColor,
    };
    return (
      <NavigationBar
        statusBar={statusBar}
        style={styles.header}
        title={'React Native Cloud Music'}
        leftButton={
          <MaterialIcons name="favorite-border" color={'#fff'} size={23} />
        }
        rightButton={<Ionicons name="ios-search" color={'#fff'} size={25} />}
      />
    );
  };

  const renderTab = () => {
    return (
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleTabChange(index)}
              style={styles.tabItem}>
              <View
                style={[
                  styles.tabItemContainer,
                  index === tabActive && styles.tabTextActive,
                ]}>
                <Text style={styles.tabText}>{tab.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const navigatorChange = route => {
    let active = 0;
    tabs.forEach((item, index) => {
      if (item.name === route.name) {
        active = index;
      }
    });
    setTabActive(active);
  };

  return (
    <SafeAreaViewPlus
      topColor={GlobalStyles.themeColor}
      style={GlobalStyles.root_container}>
      {renderNavigationBar()}
      {renderTab()}
      <HomeTopNavigator navigatorChange={route => navigatorChange(route)} />
    </SafeAreaViewPlus>
  );
}

const themeColor = GlobalStyles.themeColor;
const styles = StyleSheet.create({
  header: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: themeColor,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  tabText: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 3,
  },
  tabItemContainer: {
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  tabTextActive: {
    borderColor: '#fff',
  },
});

export default HomePage;
