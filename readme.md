
[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/support-ukraine.svg?t=1" />](https://supportukrainenow.org)

# Slack committer action

This action transforms the github committer of the current commit into a slack [userID](https://www.workast.com/help/article/how-to-find-a-slack-user-id/) or [channelID](https://help.socialintents.com/article/148-how-to-find-your-slack-team-id-and-slack-channel-id).

The mapping provided as JSON. The "fallback" is used when no user can be determined. The github username look up ignores cases.

Based on [spatie/slack-committer](https://github.com/spatie/slack-committer)

## Example usage with JSON provided as string

```yaml
- name: Resolve slack committer with JSON provided as string
  id: slack-committer
  uses: penchef/slack-committer@v1.2
    with:
    # JSON mapping from Github user to slack userID or channelID. "fallback" is used when no user was found.
    user-mapping: '{"Penchef":"UUSAQBVDZ","fallback":"XYZXYZXYZ"}'
    # OR
    # user-mapping:  "{\"Penchef\":\"UUSAQBVDZ\",\"fallback\":\"XYZXYZXYZ\"}"
```

## Example usage with JSON provided as users.json file

```yaml
- name: Resolve slack committer with JSON provided as users.json file
  id: read-users
  run:  echo users=$(jq . users.json) >> $GITHUB_OUTPUT
- name: Resolve slack committer
  id: slack-committer
  uses: penchef/slack-committer@v1.2
  with:
    user-mapping: ${{ steps.read-users.outputs.users }}
```

## Later in your workflow:

```yml
- name: Slack Notification
  if: always() # failure()
  uses: rtCamp/action-slack-notify@v2
  env:
    SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
    SLACK_MESSAGE: "You should fix this: ${{ steps.slack-committer.outputs.username }}"
# OR
- name: Notify slack fail
  env:
    SLACK_BOT_TOKEN: ${{ secrets.SLACK_TOKEN }}
  if: always() # failure()
  uses: voxmedia/github-action-slack-notify-build@v1.5.0
  with:
    channel_id: ${{ steps.slack-committer.outputs.username }}
    status: FAILED
    color: danger
# OR
- name: Notify slack
  if: always() # failure()
  env:
    SLACK_BOT_TOKEN: ${{ secrets.SLACK_TOKEN }}
  uses: pullreminders/slack-action@master
  with:
    args: '{\"channel\":\"${{ steps.slack-committer.outputs.username }}"\",\"text\":\"Hello world\"}'
```

## Advance usage:

In order to avoid repetition, one can combine the three steps

1. read user.json
2. determine slack username
3. notify committer

within one reusable workflow

1. create a new re-usable workflow by copying [notify.yml](./.github/workflows/notify.yml), either within the repo you want to use it or within a public repository. See also [re-useable workflow limitation](https://docs.github.com/en/actions/using-workflows/reusing-workflows#limitations)
2. create a github user mapping JSON, e.g. [users.json](users.json).
3. create a new job within the workflow you want to report on, e.g. see [caller.yml](.github/workflows/caller.yml)


