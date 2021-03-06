import React from 'react';
import PropTypes from 'prop-types';

class PictureInfo extends React.Component {
  static propTypes = {
    photo: PropTypes.object.isRequired
  }

  shutterSpeed(exposureTime) {
    const zeros = -Math.floor(Math.log(exposureTime) / Math.log(10));

    return '1/' + Math.pow(10, zeros);
  }

  displayTags() {
    if (!this.props.photo.hasOwnProperty('tags'))
      return '';

    if (this.props.photo.tags.length === 0)
      return 'none';

    return this.props.photo.tags
      .map(tag => tag.title)
      .join(', ');
  }

  render() {
    return (
      <div className="picture-info card shadow--2dp">
        <ul>
          <li className="title">{this.props.photo.title}</li>
          <li>ISO: {this.props.photo.iso}</li>
          <li>f/{this.props.photo.aperture}</li>
          <li>@ {this.shutterSpeed(this.props.photo.exposure_time)}</li>
          <li>v#: {this.props.photo.versionNumber}</li>
          <li>Orientation: {this.props.photo.orientation}</li>
          <li>Flag: {this.props.photo.flag}</li>
          <li className="tags">Tags: {this.displayTags()}</li>
        </ul>
      </div>
    );
  }
}

export default PictureInfo;
