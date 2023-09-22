export interface Artist {
  data: Datum[];
  resources: Resources;
}

export interface Datum {
  id: string;
  type: Type;
}

export enum Type {
  Albums = "albums",
  Artists = "artists",
  Songs = "songs",
}

export interface Resources {
  albums: { [key: string]: Album };
  artists: Artists;
  songs: { [key: string]: Song };
}

export interface Album {
  attributes: AlbumAttributes;
  id: string;
  type: Type;
}

export interface AlbumAttributes {
  artistName: string;
  artwork: Artwork;
  audioTraits: AudioTrait[];
  contentRating?: string;
  copyright: string;
  genreNames: GenreName[];
  isCompilation: boolean;
  isComplete: boolean;
  isMasteredForItunes: boolean;
  isPrerelease: boolean;
  isSingle: boolean;
  name: string;
  playParams: PlayParams;
  recordLabel: string;
  releaseDate: Date;
  trackCount: number;
  upc: string;
  url: string;
}

export interface Artwork {
  bgColor: string;
  hasP3: boolean;
  height: number;
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
  url: string;
  width: number;
}

export enum AudioTrait {
  HiResLossless = "hi-res-lossless",
  Lossless = "lossless",
  LossyStereo = "lossy-stereo",
}

export enum GenreName {
  Dance = "Dance",
  Electronic = "Electronic",
  HipHopRap = "Hip-Hop/Rap",
  Music = "Music",
  Pop = "Pop",
  RBSoul = "R&B/Soul",
  SingerSongwriter = "Singer/Songwriter",
}

export interface PlayParams {
  id: string;
  kind: Kind;
}

export enum Kind {
  Album = "album",
  Song = "song",
}

export interface Artists {
  //Dynamic key
  [artistId: string]: The1054012542;
}

export interface The1054012542 {
  attributes: The1054012542_Attributes;
  id: string;
  meta: Meta;
  relationships: Relationships;
  type: Type;
  views: The1054012542_Views;
}

export interface The1054012542_Attributes {
  artwork: Artwork;
  genreNames: GenreName[];
  name: string;
  url: string;
}

export interface Meta {
  views: MetaViews;
}

export interface MetaViews {
  order: string[];
}

export interface Relationships {
  albums: Albums;
}

export interface Albums {
  data: Datum[];
}

export interface The1054012542_Views {
  "latest-release": LatestRelease;
  "top-songs": LatestRelease;
}

export interface LatestRelease {
  attributes: LatestReleaseAttributes;
  data: Datum[];
}

export interface LatestReleaseAttributes {
  title: string;
}

export interface Song {
  attributes: SongAttributes;
  id: string;
  type: Type;
}

export interface SongAttributes {
  albumName: string;
  artistName: string;
  artwork: Artwork;
  audioLocale: AudioLocale;
  audioTraits: AudioTrait[];
  composerName?: string;
  contentRating?: string;
  discNumber: number;
  durationInMillis: number;
  genreNames: string[];
  hasCredits: boolean;
  hasLyrics: boolean;
  hasTimeSyncedLyrics: boolean;
  isAppleDigitalMaster: boolean;
  isMasteredForItunes: boolean;
  isVocalAttenuationAllowed: boolean;
  isrc: string;
  name: string;
  playParams: PlayParams;
  previews: Preview[];
  releaseDate: Date;
  trackNumber: number;
  url: string;
}

export enum AudioLocale {
  EnUS = "en-US",
  Zxx = "zxx",
}

export interface Preview {
  url: string;
}
