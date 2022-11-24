
[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/support-ukraine.svg?t=1" />](https://supportukrainenow.org)

# Slack committer action

This action transforms the github committer of the current commit into a slack userID or channelID. The mapping provided as JSON. The "fallback" is used when no user can be determined. The github username look up ignores cases.

Based on [spatie/slack-committer](https://github.com/spatie/slack-committer)

## Example usage

```yaml
- name: Resolve slack committer
  id: slack-committer
  uses: penchef/slack-committer@v1
    with:
    # JSON mapping from Github user to slack userID or channelID. "fallback" is used when no
    user-mapping: '{"Penchef":"UUSAQBVDZ","fallback":"XYZXYZXYZ"}'
    # user-mapping:  "{\"Penchef\":\"UUSAQBVDZ\",\"fallback\":\"XYZXYZXYZ\"}"
```

Later in your workflow:

```yml
- name: Slack Notification
  uses: rtCamp/action-slack-notify@v2
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

