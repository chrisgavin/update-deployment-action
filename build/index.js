import * as core from "@actions/core";
import * as inputs from "./inputs.js";
import * as updater from "./updater.js";
import * as sourceMapSupport from "source-map-support";
async function main() {
    sourceMapSupport.install();
    let deployment_id = inputs.get().deploymentID;
    if (deployment_id === null) {
        deployment_id = await updater.create();
    }
    core.saveState("deployment_id", deployment_id);
    await updater.setState(deployment_id, "in_progress");
}
main().catch(error => core.setFailed(error.stack || error));
//# sourceMappingURL=index.js.map