interface CreateBlogRequestDto {
  blogId?: number,
  name: string,
  title: string,
  description: string,
  isPublic?: boolean,
  type?: number,
}

export default CreateBlogRequestDto;
