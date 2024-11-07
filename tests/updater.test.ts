import fetchMock from "fetch-mock";
import * as inputs from "./../src/inputs";
import * as updater from "./../src/updater";

beforeEach(() => {
	fetchMock.mockGlobal();
});

afterEach(() => {
	expect(fetchMock.callHistory.done()).toBe(true);
	fetchMock.unmockGlobal();
});

describe("test setState(...)", () => {
	it("should create deployment statuses correctly", async () => {
		jest.spyOn(inputs, "get").mockReturnValue({
			githubToken: "secret-token",
			githubRepository: "foo/bar",
			deploymentID: 17,
			status: "success",
			serverURL: "https://github.com",
			runID: "123",
		});
		fetchMock.postOnce("https://api.github.com/repos/foo/bar/deployments/17/statuses", {state: "in_progress", log_url: "https://github.com/foo/bar/actions/runs/123"}, {});
		await updater.setState("in_progress");
	});
});
