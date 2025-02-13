const blockTags = ['尻', '極上の乳', '漫画素材工坊', '描き方', 'お絵かきTIPS'];
const mangaTags = ['漫画'];

const filterImage = (img) => {
  if (img.x_restrict || img.sanity_level > 4) {
    return false;
  }
};

const filterImages = (imgs, dropManga = true, dropTags = true) => {
  return imgs.filter((img) => {
    if (
      img.restrict ||
      img.x_restrict ||
      img.sanity_level >= 4 ||
      (img.type !== 'illust' && dropManga) ||
      (img.title.includes('漫画') && dropManga)
    ) {
      return false;
    }
    if (img.tags && img.tags.length) {
      if (dropTags || dropManga) {
        for (let i = 0; i < img.tags.length; i++) {
          if (dropTags && blockTags.includes(img.tags[i].name)) {
            return false;
          }
          if (dropManga && mangaTags.includes(img.tags[i].name)) {
            return false;
          }
        }
      }
    }
    if (!window.pixiviz.infoMap[img.id]) window.pixiviz.infoMap[img.id] = img;
    return true;
  });
};

export { filterImage, filterImages };
