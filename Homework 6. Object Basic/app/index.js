const compass = {};

const west = "west";
const east = "east";
const north = "north";
const south = "south";

compass[west] = {
  left: south,
  right: north,
};

compass[east] = {
  left: north,
  right: south,
};

compass[north] = {
  left: west,
  right: east,
};

compass[south] = {
  left: east,
  right: west,
};

console.log(compass);
console.log(compass.west.right);
console.log(compass[compass.west.right]);
console.log(compass[compass.north.left]);