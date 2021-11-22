import * as React from "react";
import { StyleSheet, View, ScrollView, Dimensions, Text, ImageBackground } from "react-native";

const DEVICE_WIDTH = Dimensions.get("window").width;
const AUTO_SWIPE_INTERVAL = 4000;

class Slider extends React.Component {
  scrollRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0
    };
    this.scrollRef = React.createRef();
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState(
        prev => ({
          selectedIndex:
            prev.selectedIndex === this.props.images.length - 1
              ? 0
              : prev.selectedIndex + 1
        }),
        () => {
          this.scrollRef.current.scrollTo({
            animated: true,
            x: DEVICE_WIDTH * this.state.selectedIndex,
            y: 0
          });
        }
      );
    }, AUTO_SWIPE_INTERVAL);
  };

  nextImage = () =>
    this.setState(prev => ({
      selectedIndex:
        prev.selectedIndex === this.props.images.length - 1
          ? 0
          : prev.selectedIndex + 1
    }));

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ selectedIndex });
  };

  render() {
    const { images } = this.props;
    const { selectedIndex } = this.state;
    return (
      <View style={{ height: "100%", width: "100%" }}>
        <ScrollView
          style={styles.scroll}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={this.setSelectedIndex}
          ref={this.scrollRef}
        >
          {images.map(image => (
            <>
            <ImageBackground
              style={styles.backgroundImage}
              source={image.img}
              key={image}
            >
            <Text style={styles.descripcion}>
              {image.texto}
            </Text>
            </ImageBackground>
            </>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },  
  backgroundImage: {
    justifyContent: "center",
    alignItems: 'center',
    flexGrow: 1,
    height: "100%",
    width: Dimensions.get("window").width
  },
  descripcion : {
    color: "white",
    fontSize: 42,
    letterSpacing: 4,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "grey",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
    backgroundColor: "#00000050"
}
});

export { Slider };