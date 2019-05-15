import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className="NavigationItems">
    <NavigationItem link="/">Summary</NavigationItem>
  </ul>
);

export default navigationItems;