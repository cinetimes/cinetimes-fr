'use strict';

hexo.extend.helper.register('raw_link', function(path) {
    return 'https://github.com/cinetimes/cinetimes-fr/edit/source/source/' + path;
  });