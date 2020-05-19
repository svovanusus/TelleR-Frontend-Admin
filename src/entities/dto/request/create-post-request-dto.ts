interface CreatePostRequestDto {
  blogId: number,
  title: string,
  content: string,
  isPublished: boolean,
}

export default CreatePostRequestDto;
