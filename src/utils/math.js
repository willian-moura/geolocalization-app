const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}

const getDistance = (p1, p2) => {
  const { latitude: lat1, longitude: lon1} = p1
  const { latitude: lat2, longitude: lon2} = p2

  const R = 6371e3 // raio da terra em metros

  const lat1_rad = lat1 * Math.PI/180
  const lat2_rad = lat2 * Math.PI/180
  const latDelta_rad = (lat2-lat1) * Math.PI/180
  const lonDelta_rad = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(latDelta_rad/2) * Math.sin(latDelta_rad/2) +
      Math.cos(lat1_rad) * Math.cos(lat2_rad) *
      Math.sin(lonDelta_rad/2) * Math.sin(lonDelta_rad/2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

  return R * c // em metros
}

const isInRange = (p1, p2, range) => {
  return getDistance(p1, p2) <= range
}

export default {
  getRandomArbitrary,
  getDistance,
  isInRange
}
