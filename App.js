import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import {Icon} from 'react-native-elements';

class ImageComponent extends Component {
  constructor() {
    super();
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

export default class App extends Component<{}> {
  constructor() {
    super();
    this.state = {
      imagesData: null,
      loading: true,
      gridView: true,
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({imagesData: responseJson, loading: false});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  changeView = () => {
    this.setState({gridView: !this.state.gridView});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Images</Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.switchIcon}
              onPress={this.changeView}>
              <Icon
                size={this.state.gridView ? 30 : 23}
                name={this.state.gridView ? 'list' : 'grid'}
                type="ionicon"
                color="#517fa4"
              />
            </TouchableOpacity>
            <Icon
              containerStyle={styles.addIcon}
              size={23}
              name="camera-plus"
              type="MaterialCommunityIcons"
              color="#517fa4"
            />
          </View>
        </View>
        {this.state.loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Please Wait...</Text>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              keyExtractor={(item) => item.id}
              key={this.state.gridView ? 1 : 0}
              numColumns={this.state.gridView ? 2 : 1}
              data={this.state.imagesData}
              renderItem={({item}) => (
                <ImageComponent
                  gridView={this.state.gridView}
                  thumbnailUrl={item.thumbnailUrl}
                  name={item.title}
                />
              )}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  headingContainer: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingText: {
    padding: 10,
    fontSize: 18,
    width: '80%',
    color: 'black',
    fontWeight: 'bold',
  },
  iconsContainer: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  switchIcon: {
    color: 'black',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    width: '50%',
  },
  addIcon: {
    color: 'black',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    width: '50%',
  },
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    paddingTop: 10,
    fontSize: 18,
    color: 'black',
  },
});
