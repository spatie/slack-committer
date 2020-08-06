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
``
