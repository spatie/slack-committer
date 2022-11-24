const core = require('@actions/core');
const github = require('@actions/github');




try {
    const committer = github.context.actor?.toLowerCase();

    const inputJSON = JSON.parse(core.getInput('user-mapping'));
    console.log('bar', inputJSON)
    const githubToSlackId = new Map(Object.entries(inputJSON).map(([key, value]) => ([key.toLocaleLowerCase(), value])))

    console.log('foo', githubToSlackId)

    let slackRecipient = githubToSlackId.get(committer) || githubToSlackId.get('default');

    if (!slackRecipient) {
        throw new Error(`Could not determine the slack username for ${committer}. Verify the "user-mapping" is correct:\n${JSON.stringify(inputJSON, undefined, 2)}`);
    }

    if (!(slackRecipient.startsWith('#') || slackRecipient.startsWith('@'))) {
        slackRecipient = `@${slackRecipient}`
    }
    const output = `<${slackRecipient}>`

    core.setOutput("username", output);
} catch (error) {
    core.setFailed(error.message);
}
