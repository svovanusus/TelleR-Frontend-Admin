interface CreatePostRequestDto {
  postId?: number,
  blogId: number,
  title: string,
  content: string,
  isPublished: boolean,
}

export default CreatePostRequestDto;
