export class User {
  user_email: string;
  user_gender: number;
  user_nickname: string;
  user_roleid: number;
  user_id: number;
  gender_name : string;

  constructor(userModel?) {
    (this.user_email = userModel.user_email),
      (this.user_gender = userModel.user_gender);
    this.user_nickname = userModel.user_nickname;
    this.user_roleid = userModel.user_roleid;
    this.user_id = userModel.user_id;
    this.gender_name = userModel.gender_name;
  }
}
