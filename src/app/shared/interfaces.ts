export interface User{
  email: string,
  password: string,
  password_confirmation?: string,
  returnSecureToken?: boolean,
  name?: string,
  file?: File
}

export interface Post{
  id?: string,
  userId: string,
  title: string,
  message: string,
  // updatedDate:Date,
  // createdDate: Date

}


