module.exports = {
  base: '/pf-table/',
  dest: './dist',
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/xxxxxxx/blog',
    // 自定义仓库链接文字。
    repoLabel: 'My GitHub',
    // sidebar: [
    //   {
    //     title: 'pf-table',   // 必要的
    //     path: '/pf-table',      // 可选的, 应该是一个绝对路径
    //     collapsable: false, // 可选的, 默认值是 true,
    //     sidebarDepth: 1,    // 可选的, 默认值是 1
    //     children: [
    //       '基础表格'
    //     ]
    //   }
    // ]
    sidebar: {
      '/pf-table/': [
        {
          title: 'pf-table',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '',
            'base-table',
            'complex-table',
            'tab-table'
          ]
        }
      ]
    }
  },
  markdown: {
    lineNumbers: true
  },
  // title: 'Hello VuePress',
  // description: 'Just playing around'
  plugins: [],
  chainWebpack: (config, isServer) => {
    config.module
      .rule('js') // Find the rule.
      .use('babel-loader') // Find the loader
      .tap(options => Object.assign(options, { // Modifying options
        plugins: [
          '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-optional-chaining'
        ]
      }))
  }
}
