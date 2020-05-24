interface PostInfoForEditDto {
  postId: number,
  title: string,
  postContent: string,
  isPublished: boolean,
  publishedDate: Date,
}

export default PostInfoForEditDto;
