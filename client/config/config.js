Router.plugin('seo', {
  defaults: {
    title: 'Sangbasen',
    suffix: 'Sangbasen',
    separator: '|',
    description: 'Noter og tabs til folket!',
    image: 'http://sangbasen.blaauw.me/sangbasen.png',
    meta: {
      keywords: ['noter', 'tabs', 'musikk', 'lovsang']
    },
    og: {
      site_name: 'Sangbasen',
      type: 'article',
      image: 'http://sangbasen.blaauw.me/sangbasen.png',
      description: 'Noter og tabs til folket!'
      // etc.
    }
  }
});
