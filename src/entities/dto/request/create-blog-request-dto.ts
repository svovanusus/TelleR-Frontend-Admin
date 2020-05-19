interface CreateBlogRequestDto {
  title: string,
  description: string,
  isPublic?: boolean,
  type?: number,
}

export default CreateBlogRequestDto;
