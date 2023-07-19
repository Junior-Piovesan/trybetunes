export type AlbumType = {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
};

export type UserType = {
  name: string;
  email: string;
  image: string;
  description: string;
};

export type SongType = {
  trackId: number,
  trackName: string,
  previewUrl: string,
};

export type HandleType = {
  target:{ name:string, value:string }
};

export type InfoAlbumType = {
  collectionName:string,
  artworkUrl100:string,
  artistName:string,
};

export type MusicsType = {
  artistId: number,
  artistName:string,
  artistViewUrl:string,
  artworkUrl30:string,
  artworkUrl60:string,
  artworkUrl100:string,
  collectionCensoredName:string,
  collectionExplicitness:string,
  collectionId:number,
  collectionName:string,
  collectionPrice:number,
  collectionViewUrl:string,
  country:string,
  currency:string,
  discCount:number,
  discNumber:number,
  isStreamable:boolean,
  kind:string,
  previewUrl:string,
  primaryGenreName:string,
  releaseDate:string,
  trackCensoredName:string,
  trackCount:number,
  trackExplicitness:string,
  trackId:number,
  trackName:string,
  trackNumber:number,
  trackPrice:number,
  trackTimeMillis:number,
  trackViewUrl:string,
  wrapperType:string,
};
