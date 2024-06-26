import * as core from "@actions/core";
import * as inputs from "./inputs.js";
import * as updater from "./updater.js";
import * as sourceMapSupport from "source-map-support";

async function main() {
	sourceMapSupport.install();

	await updater.setState(inputs.get().status === "success" ? "success" : "failure");
}

main().catch(error => core.setFailed(error.stack || error));
