import * as core from "@actions/core";
import * as github from "@actions/github";
import * as inputs from "./inputs.js";

type state = "in_progress" | "error" | "failure" | "inactive" | "queued" | "pending" | "success";

export async function setState(state: state): Promise<void> {
	const [owner_name, repository_name] = inputs.get().githubRepository.split("/");
	const octokit = github.getOctokit(
		inputs.get().githubToken,
		{
			request: { fetch: fetch }
		},
	);
	core.info(`Setting deployment status for deployment ${inputs.get().deploymentID} to ${state}...`);
	await octokit.rest.repos.createDeploymentStatus({
		owner: owner_name,
		repo: repository_name,
		deployment_id: inputs.get().deploymentID,
		state: state,
		log_url: `${inputs.get().serverURL}/${inputs.get().githubRepository}/actions/runs/${inputs.get().runID}`,
	});
}
