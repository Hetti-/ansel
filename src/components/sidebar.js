import fs from 'fs';
import React from 'react';
import PropTypes from 'prop-types';

import Tags from './tags';
import Dates from './dates';
import Devices from './devices';
import Logo from './logo';

import config from './../config';

let settings;

if (fs.existsSync(config.settings))
  settings = require(config.settings);

class Sidebar extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  }

  render() {
    let menus = [
      <Dates
        key="0"
        actions={this.props.actions} />,
      <Tags key="1" actions={this.props.actions} />,
      <Devices key="2" />
    ];

    if (settings && settings.hasOwnProperty('menus')) {
      menus = [];

      settings.menus.forEach((menu, key) => {
        if (menu === 'dates') {
          menus.push(
            <Dates
              key={key}
              actions={this.props.actions} />
          );
        } else if (menu === 'tags')
          menus.push(<Tags key={key} actions={this.props.actions} />);

        else if (menu === 'devices')
          menus.push(<Devices key={key} />);
      });
    }

    return (
      <div id="sidebar" className={this.props.className}>
        <h2><Logo /> Library</h2>

        <div className="sidebar-content">
          <button
            onClick={this.props.actions.getPhotos}
            className="button">
            <i className="fa fa-book"></i> All content
          </button>

          <button
            onClick={this.props.actions.getFlagged}
            className="button flagged">
            <i className="fa fa-flag"></i> Flagged
          </button>

          <button
            onClick={this.props.actions.getProcessed}
            className="button">
            <i className="fa fa-pencil-square-o"></i> Processed
          </button>

          <button
            onClick={this.props.actions.getTrashed}
            className="button">
            <i className="fa fa-trash-o"></i> Trash
          </button>


          {menus}
        </div>
      </div>
    );
  }
}

export default Sidebar;
