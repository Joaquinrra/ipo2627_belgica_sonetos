import { SonnetModel } from "./model/sonnetModel.js";
import { SonnetView } from "./view/sonnetView.js";
import { SonnetController } from "./controller/sonnetController.js";

const model = new SonnetModel();
const view = new SonnetView();

new SonnetController(model, view);

