import * as core from "@actions/core";
import * as updater from "./updater";
import * as sourceMapSupport from "source-map-support";

async function main() {
	sourceMapSupport.install();

	await updater.setState("in_progress");
}

main().catch(error => core.setFailed(error.stack || error));
