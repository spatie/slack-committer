
[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/support-ukraine.svg?t=1" />](https://supportukrainenow.org)

# Slack committer action

This action transforms the committer of the current commit into a slack friendly @name so the Spatie team member will be mentioned. When a non-Spatie member commits, the action will use the committers GitHub username.

## Example usage

```yaml
-   name: Resolve slack committer
    id: slack-committer
    uses: spatie/slack-committer@1.0.0
```

Later in your workflow:

```yml
-   name: Slack Notification
    uses: rtCamp/action-slack-notify@master
    env:
        SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
        SLACK_MESSAGE: "You should fix this: ${{ steps.slack-committer.outputs.username }}"
```

## Adding a new team member

You can add a new team member by updating the `index.js` file. You'll need a Slack user id next to the name of the team member, that id can be found as [such](https://help.workast.com/hc/en-us/articles/360027461274-How-to-find-a-Slack-user-ID). Don't forget to commit the action with the new member and tag a new release!  
