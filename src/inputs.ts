import * as core from "@actions/core";

class Inputs {
	githubToken = core.getInput("github-token", {required: true});
	githubRepository = core.getInput("github-repository", {required: true});
	deploymentID = parseInt(core.getInput("deployment-id", {required: true}));
	status = core.getInput("status", {required: true});
	serverURL = core.getInput("server-url", {required: true});
	runID = core.getInput("run-id", {required: true});
}

export function get():Inputs {
	return new Inputs();
}
