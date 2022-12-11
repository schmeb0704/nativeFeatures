import { View, StyleSheet, Alert, Text, Image } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useState } from "react";

export default function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this app"
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {}

  let userLocation = <Text>No location picked yet</Text>;

  if (pickedLocation) {
    userLocation = (
      <Text>
        Latitude: {pickedLocation.lat}, Longitude: {pickedLocation.lng}
      </Text>
    );
  }

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
