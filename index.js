const core = require('@actions/core');
const github = require('@actions/github');


try {
    const committer = github.context.actor?.toLowerCase();

    const inputJSON = JSON.parse(core.getInput('user-mapping'));
    const githubToSlackId = new Map(Object.entries(inputJSON).map(([key, value]) => ([key.toLocaleLowerCase(), value])))

    const output = githubToSlackId.get(committer) || githubToSlackId.get('fallback');

    if (!output) {
        throw new Error(`Could not determine the slack username for ${committer}. Verify the "user-mapping" is correct:\n${JSON.stringify(inputJSON, undefined, 2)}`);
    }

    core.setOutput("username", output);
} catch (error) {
    core.setFailed(error.message);
}
