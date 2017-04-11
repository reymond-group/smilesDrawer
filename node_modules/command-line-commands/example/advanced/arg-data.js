module.exports = {
  null: {
    definitions: [
      { name: 'version', alias: 'v', type: Boolean, description: 'Print the version number.' }
    ],
    usage: [
      {
        header: 'git',
        content: 'Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.'
      },
      {
        header: 'synopsis',
        content: '$ git <options> <command>'
      },
      {
        header: 'Command List',
        content: [
          { name: 'help', summary: 'Display help information about Git.' },
          { name: 'commit', summary: 'Record changes to the repository.' }
        ]
      }
    ]
  },
  help: {
    definitions: [
      { name: 'topic', type: String, description: 'the topic to display help on', defaultOption: true }
    ],
    usage: [
      {
        header: 'git help',
        content: 'Git help about a git command'
      },
      {
        header: 'synopsis',
        content: '$ git help <options>'
      }
    ]
  },
  commit: {
    definitions: [
      { name: 'message', alias: 'm', type: String, description: 'Commit message.' }
    ],
    usage: [
      {
        header: 'git commit',
        content: 'Commit some work.'
      },
      {
        header: 'synopsis',
        content: '$ git commit <options> [--message] <message>'
      }
    ]
  }
}
