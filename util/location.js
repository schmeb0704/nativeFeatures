import axios from "axios";

const locationIQ_API_KEY = `pk.1d586227466c054535ee85992b3f7ac7`;

export async function translateCoords(lat, lng) {
  const response = await axios.get(
    `https://us1.locationiq.com/v1/search?key=${locationIQ_API_KEY}&q=${lat}%2C%20${lng}&format=json`
  );
  return response.data[0].display_name;
}

export function getMap(lat, lng) {
  const mapPrev = `https://maps.locationiq.com/v3/staticmap?key=${locationIQ_API_KEY}&center=${lat},${lng}&zoom=15&size=300x300&format=png&maptype=roadmap&markers=icon:large-red-cutout|${lat},${lng}`;
  return mapPrev;
}
