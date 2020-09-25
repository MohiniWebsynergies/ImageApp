import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
export default class ImageComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.gridView ? (
      <View style={styles.gridViewHolder}>
        <Image
          source={{uri: this.props.thumbnailUrl}}
          style={styles.gridViewImage}
        />
        <View style={styles.textViewHolder}>
          <Text numberOfLines={1} style={styles.textOnImage}>
            {this.props.name}
          </Text>
        </View>
      </View>
    ) : (
      <View style={styles.listViewHolder}>
        <Image
          source={{uri: this.props.thumbnailUrl}}
          style={styles.listViewImage}
        />
        <View style={styles.listViewText}>
          <Text>{this.props.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridViewHolder: {
    margin: 5,
    height: 160,
    flex: 1,
    position: 'relative',
  },

  gridViewImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },

  textViewHolder: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  textOnImage: {
    color: 'white',
  },
  listViewHolder: {
    margin: 5,
    flex: 1,
    height: 75,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
  },
  listViewImage: {
    flex: 0.2,
    height: '90%',
    resizeMode: 'cover',
  },
  listViewText: {
    flex: 0.8,
    paddingLeft: 10,
    justifyContent: 'center',
  },
});
