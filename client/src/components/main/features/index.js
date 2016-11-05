import React from 'react';

import OverviewBlock from './overview-block';
import AccessBlock from './access-block';
import CollaborateBlock from './collaborate-block';
import DistractionBlock from './distraction-block';

const Features = () => {
  return (    
    <div className="feature-blocks">
      <OverviewBlock />
      <CollaborateBlock />
      <AccessBlock />
      <DistractionBlock />
    </div>
  );
};

export default Features;
