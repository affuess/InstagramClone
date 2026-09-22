export type FeedStackParamList = {
  Feed: undefined;
  Comments: { postId: string };
  UserProfile: { userId: string; userName?: string };
};

export type SearchStackParamList = {
  Search: undefined;
  UserProfile: { userId: string; userName?: string };
};

export type CreateStackParamList = {
  Picker: undefined;
  PostDetails: { imageUri: string };
};