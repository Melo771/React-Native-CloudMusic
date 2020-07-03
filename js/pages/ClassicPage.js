import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class MoviePage extends Component {
  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.indexContainer}>
              <Text style={styles.plain}>No.</Text>
              <Text style={styles.index}>17</Text>
              <View style={styles.line} />
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.month}>三月</Text>
              <Text style={styles.year}>2018</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 30,
  },
  indexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'column',
    marginTop: 3,
  },
  plain: {
    fontSize: 16,
  },
  index: {
    fontSize: 30,
    marginRight: 7,
  },
  line: {
    height: 22,
    marginRight: 7,
    width: 1,
    backgroundColor: 'black',
  },
  month: {
    fontSize: 12,
  },
  year: {
    fontSize: 12,
  },
});

export default MoviePage;
