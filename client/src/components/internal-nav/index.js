import React from 'react';

const InternalNav = () => {
  return (
    <nav class="light-blue lighten-1" role="navigation">
      <div class="nav-wrapper container"><a id="logo-container" onclick="moveCanvas()" class="brand-logo">CollaBoard</a>
        <ul class="right hide-on-med-and-down">
          <li><a href="#">Text Editor</a></li>
        </ul>

        <ul id="nav-mobile" class="side-nav">
          <li><a href="#">Text Editor</a></li>
        </ul>
        <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
      </div>
    </nav>
  );
};

export default InternalNav;
