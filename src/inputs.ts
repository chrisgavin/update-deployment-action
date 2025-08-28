import * as core from "@actions/core";

class Inputs {
	environment = core.getInput("environment", {required: true});
	ref = core.getInput("ref", {required: true});
	githubToken = core.getInput("github-token", {required: true});
	githubRepository = core.getInput("github-repository", {required: true});
	deploymentID = core.getInput("deployment-id") !== "" ? parseInt(core.getInput("deployment-id")) : null;
	status = core.getInput("status", {required: true});
	serverURL = core.getInput("server-url", {required: true});
	runID = core.getInput("run-id", {required: true});
}

export function get():Inputs {
	return new Inputs();
}
