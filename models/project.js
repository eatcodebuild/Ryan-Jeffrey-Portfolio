const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description_para_1: { type: String, required: true },
  description_para_2: { type: String, required: true },
  project_link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/.+/.test(v),
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  github_link: {
    type: String,
    validate: {
      validator: (v) => !v || /^https?:\/\/.+/.test(v), // allow empty or valid URL
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  img: { type: String, required: true }, // file path or URL
  has_repo: { type: Boolean, required: true },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
