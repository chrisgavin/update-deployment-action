import * as core from "@actions/core";
import * as github from "@actions/github";
import * as inputs from "./inputs.js";

type state = "in_progress" | "error" | "failure" | "inactive" | "queued" | "pending" | "success";

export async function create(): Promise<number> {
	const [owner_name, repository_name] = inputs.get().githubRepository.split("/");
	const octokit = github.getOctokit(
		inputs.get().githubToken,
		{
			request: { fetch: fetch }
		},
	);
	core.info(`Creating deployment...`);
	const deployment = await octokit.rest.repos.createDeployment({
		owner: owner_name,
		repo: repository_name,
		ref: inputs.get().ref,
		environment: inputs.get().environment,
		required_contexts: [],
	});
	if ("id" in deployment.data) {
		return deployment.data.id;
	} else {
		throw new Error(`Failed to create deployment: ${deployment.data.message || "unknown error."}`);
	}
}

export async function setState(deployment_id: number, state: state): Promise<void> {
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
		deployment_id: deployment_id,
		state: state,
		log_url: `${inputs.get().serverURL}/${inputs.get().githubRepository}/actions/runs/${inputs.get().runID}`,
	});
}
