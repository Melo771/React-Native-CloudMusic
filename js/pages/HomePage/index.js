import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeTopNavigator from '../../navigator/HomeTopNavigator';
import GlobalStyles from '../../res/styles/GlobalStyles';
import NavigationBar from '../../components/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus';

const tabs = [
  {
    label: '推荐',
    name: 'Recommend',
  },
  {
    label: '歌手',
    name: 'BookPage',
  },
  {
    label: '排行版',
    name: 'LikePage',
  },
];

function HomePage(props) {
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
        leftButton={<Ionicons name="md-menu" color={'#fff'} size={25} />}
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
              <Text
                style={[
                  styles.tabText,
                  index === tabActive && styles.tabTextActive,
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const navigatorChange = route => {
    let tabActive = 0;
    tabs.forEach((item, index) => {
      if (item.name === route.name) {
        tabActive = index;
      }
    });
    setTabActive(tabActive);
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
  headerTitle: {
    fontSize: 20,
    color: '#fff',
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
    borderBottomWidth: 2,
    borderColor: 'transparent',
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 3,
  },
  tabTextActive: {
    borderColor: '#fff',
  },
});

export default HomePage;
