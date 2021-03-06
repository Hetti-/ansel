import updatePhotos from './../lib/update-photos';

export default function reducers(state, action) {
  switch (action.type) {
  case 'GET_PHOTOS_SUCCESS':
    return {
      ...state,
      diff: false,
      current: -1,
      importing: false,
      splashed: true,
      currentDate: action.hasOwnProperty('date') ? action.date : state.currentDate,
      currentTag: action.hasOwnProperty('tagId') ? action.tagId : state.currentTag,
      photosCount: action.count || action.photos.length,
      showOnlyFlagged: action.hasOwnProperty('showOnlyFlagged') ? action.showOnlyFlagged : state.showOnlyFlagged,
      route: action.route || '',
      highlighted: [],
      photos: action.photos.map(photo => {
        photo.versionNumber = 1;

        if (photo.hasOwnProperty('versions') && photo.versions.length > 0) {
          photo.versionNumber = 1 + photo.versions.length;

          let lastVersion = photo.versions[photo.versions.length - 1];

          photo.thumb = lastVersion.output || photo.thumb;
          photo.thumb_250 = lastVersion.thumbnail || photo.thumb_250;
        }

        return photo;
      })
    };

  case 'ON_REMOVED_PHOTOS':
    return {
      ...state,
      photos: state.photos.filter(photo => !action.ids.includes(photo.id))
    };

  case 'UPDATED_PHOTO_SUCCESS':
    return {
      ...state,
      photos: updatePhotos(state.photos, action.photo)
    };

  default:
    return state;
  }
}
