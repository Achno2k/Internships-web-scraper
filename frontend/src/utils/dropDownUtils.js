import { State } from "country-state-city";
const profileOptions = [
  "Web Development",
  "Data Science",
  "Machine Learning",
  "Android Development",
  "iOS Development",
  "Software Development",
];

const locationOptions = State.getStatesOfCountry("IN").map((state) => state.name);

export { profileOptions, locationOptions };
