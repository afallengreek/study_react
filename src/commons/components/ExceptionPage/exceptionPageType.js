const exceptionPageTypes = {
  NULLPAGE: 'nullpage',
  403: '403',
  404: '404',
  500: '500',
  SPECIAL500: 'special500',
};

export const exceptionPages = {
  nullpage: require('./img/nullpage.png'),
  403: require('./img/page403.png'),
  404: require('./img/page404.png'),
  500: require('./img/page500.png'),
  special500: require('./img/page500-special.png'),
};

export default { exceptionPageTypes };
