export class UpdateTokenResponse {
  /** accessToken @example 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHlhLnJ1IiwiaWQiOiJiMzcwNWVjMi01MWYwLTRiYWEtYTRjYi1iMWZiYTZlY2NhMTQiLCJyb2xlIjoiVVNFUiIsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3MTI2NzI5OTUsImV4cCI6MTcxMjY3MzI5NX0.kKbzAN2e4JDGKXtozLjcBWrzZNGi0djDVb5R5qeLCl0' */
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
