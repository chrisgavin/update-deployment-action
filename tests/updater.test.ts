import nock from "nock";
import * as inputs from "./../src/inputs";
import * as updater from "./../src/updater";

describe("test setState(...)", () => {
	it("should create deployment statuses correctly", async () => {
		nock.disableNetConnect();
		jest.spyOn(inputs, "get").mockReturnValue({
			githubToken: "secret-token",
			githubRepository: "foo/bar",
			deploymentID: 17,
			status: "success",
			serverURL: "https://github.com",
			runID: "123",
		});
		nock("https://api.github.com")
			.post("/repos/foo/bar/deployments/17/statuses", {state: "in_progress", log_url: "https://github.com/foo/bar/actions/runs/123"})
			.reply(200);
		updater.setState("in_progress");
	});
});
