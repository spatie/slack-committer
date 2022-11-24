
[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/support-ukraine.svg?t=1" />](https://supportukrainenow.org)

# Slack committer action

This action transforms the committer of the current commit into a slack friendly @name so the Spatie team member will be mentioned. When a non-Spatie member commits, the action will use the committers GitHub username.

## Example usage

```yaml
- name: Resolve slack committer
  id: slack-committer
  uses: penchef/slack-committer@main
    with:
    # JSON mapping from Github user to slack userID or channelID. "fallback" is used when no
    user-mapping: '{"penchef":"UUSAQBVDZ","fallback":"XYZXYZXYZ"}'
```

Later in your workflow:

```yml
- name: Slack Notification
  uses: penchef/action-slack-notify@main
  env:
    SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
    SLACK_MESSAGE: "You should fix this: ${{ steps.slack-committer.outputs.username }}"
#...
- name: Notify slack fail
  env:
    SLACK_BOT_TOKEN: ${{ secrets.SLACK_TOKEN }}
  if: always()
  uses: voxmedia/github-action-slack-notify-build@v1.5.0
  with:
    channel_id: ${{ steps.slack-committer.outputs.username }}"
    status: FAILED
    color: danger
#...
- name: Notify slack
  if: always()
  env:
    SLACK_BOT_TOKEN: ${{ secrets.SLACK_TOKEN }}
  uses: pullreminders/slack-action@master
  with:
    args: '{\"channel\":\"${{ steps.slack-committer.outputs.username }}"\",\"text\":\"Hello world\"}'
```

## Adding a new team member

You can add a new team member by updating the `index.js` file. You'll need a Slack user id next to the name of the team member, that id can be found as [such](https://help.workast.com/hc/en-us/articles/360027461274-How-to-find-a-Slack-user-ID). Don't forget to commit the action with the new member and tag a new release!
