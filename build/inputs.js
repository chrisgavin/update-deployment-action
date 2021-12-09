"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const core = __importStar(require("@actions/core"));
class Inputs {
    constructor() {
        this.githubToken = core.getInput("github-token", { required: true });
        this.githubRepository = core.getInput("github-repository", { required: true });
        this.deploymentID = parseInt(core.getInput("deployment-id", { required: true }));
        this.status = core.getInput("status", { required: true });
        this.serverURL = core.getInput("server-url", { required: true });
        this.runID = core.getInput("run-id", { required: true });
    }
}
function get() {
    return new Inputs();
}
exports.get = get;
//# sourceMappingURL=inputs.js.map