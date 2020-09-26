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
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import ImageComponent from './ImageComponent';
import {ActionTypes} from '../reducers/constants';
import AppStorage from '../Util/AppStorage';
import {connect} from 'react-redux';

class RootScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesData: [],
      localImages: [],
      loading: true,
      gridView: true,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: ActionTypes.FETCH_SERVER_IMAGES,
      payload: '',
    });
    this.setData();
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {
    if (this.props.app.serverFetched !== prevProps.app.serverFetched) {
      if (this.props.app.serverFetched) {
        this.setData();
      }
    }
    if (this.props.app.localImageSaved !== prevProps.app.localImageSaved) {
      if (this.props.app.localImageSaved) {
        this.setData();
      }
    }
  }

  setData = () => {
    let localImages = this.props.app.localImages;
    let serverImages = this.props.app.serverImages;
    let imagesData = localImages.concat(serverImages);
    this.setState(
      {
        imagesData,
        loading: false,
      },
      () => {
        this.props.dispatch({
          type: ActionTypes.IMAGE_SAVE,
          payload: '',
        });
      },
    );
  };

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
              size={30}
              name="camera-outline"
              type="ionicon"
              color="#517fa4"
              onPress={() => {
                ImagePicker.showImagePicker(
                  {
                    title: 'Select Photo',
                    mediaType: 'photo',
                  },
                  (response) => {
                    if (response.data) {
                      const local = {
                        albumId: 1,
                        id: 1,
                        title: response.fileName,
                        url: response.uri,
                        thumbnailUrl: response.uri,
                      };

                      this.props.dispatch({
                        type: ActionTypes.IMAGES_SAVED_COMPLETE,
                        payload: local,
                      });
                    }
                  },
                );
              }}
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
    justifyContent: 'space-between',
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

RootScreen.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => ({
  app: state.root,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen);
