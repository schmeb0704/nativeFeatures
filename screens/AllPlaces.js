import PlacesList from "../components/places/PlacesList";
import { Button, View } from "react-native";

export default function AllPlaces({ navigation }) {
  function goToAddPlace() {
    navigation.navigate("AddPlace");
  }

  return (
    <View>
      <PlacesList />
    </View>
  );
}
