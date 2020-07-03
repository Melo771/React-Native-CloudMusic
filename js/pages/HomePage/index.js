import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeTopNavigator from '../../navigator/HomeTopNavigator';

const tabs = [
  {
    label: '推荐',
    name: 'ClassicPage',
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

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      tabActive: 0,
    };
  }

  handleTabChange(index) {
    this.setState({
      tabActive: index,
    });
    this.props.navigation.navigate(tabs[index].name);
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Ionicons name="md-menu" color={'#fff'} size={25} />
        <Text style={styles.headerTitle}>React Native Cloud Music</Text>
        <Ionicons name="ios-search" color={'#fff'} size={25} />
      </View>
    );
  }

  renderTab() {
    const {tabActive} = this.state;
    return (
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => this.handleTabChange(index)}
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
  }

  navigatorChange(route) {
    let tabActive = 0;
    tabs.forEach((item, index) => {
      if (item.name === route.name) {
        tabActive = index;
      }
    });
    this.setState({
      tabActive,
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}
        {this.renderTab()}
        <HomeTopNavigator
          navigatorChange={route => this.navigatorChange(route)}
        />
      </View>
    );
  }
}

const THEME_COLOR = 'rgb(212, 68, 57)';
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: THEME_COLOR,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: THEME_COLOR,
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
