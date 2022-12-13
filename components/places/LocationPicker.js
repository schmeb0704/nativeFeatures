import { View, StyleSheet, Alert, Text, Image } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { getMap, translateCoords } from "../../util/location";

export default function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState();
  const [currLoc, setCurrLoc] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await translateCoords(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onPickLocation({ ...pickedLocation, address: address });
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  function getLocationHandler() {
    setPickedLocation(currLoc);
  }

  async function pickOnMapHandler() {
    navigation.navigate("Map", {
      lat: currLoc.lat,
      lng: currLoc.lng
    });
  }

  let userLocation = <Text>No location picked yet</Text>;

  if (pickedLocation) {
    userLocation = (
      <Image
        source={{ uri: getMap(pickedLocation.lat, pickedLocation.lng) }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      // <Text>
      //   Latitude: {pickedLocation.lat}, Longitude: {pickedLocation.lng}
      //   {mapPic}
      // </Text>
    );
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      setCurrLoc({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    })();
  }, []);

  console.log(currLoc);

  return (
    <View>
      <View style={styles.mapPreview}>{userLocation}</View>
      <View style={styles.buttons}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    height: 200,
    width: "100%",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
