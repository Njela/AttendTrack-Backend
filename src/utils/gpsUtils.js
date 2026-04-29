const GEOFENCE_RADIUS = parseFloat(process.env.GEOFENCE_RADIUS) || 50;

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function isWithinGeofence(studentLat, studentLon, classLat, classLon) {
  const distance = getDistance(studentLat, studentLon, classLat, classLon);
  return {
    withinZone: distance <= GEOFENCE_RADIUS,
    distance: Math.round(distance),
  };
}

module.exports = { getDistance, isWithinGeofence };