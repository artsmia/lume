console.log("CONFIGS")

module.exports = {
  "transform": {".*": "<rootDir>/node_modules/babel-jest"},
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFiles: ["./jest.setup.js"]
};
